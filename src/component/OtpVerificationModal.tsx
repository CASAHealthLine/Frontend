import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import api from "../api";

const InputBoxes = ({ length = 6, onChange }) => {
    const [values, setValues] = useState(Array(length).fill(''));

    // Xử lý thay đổi từng ô input
    const handleChange = (e, index) => {
        const newValues = [...values];
        newValues[index] = e.target.value.slice(-1);
        setValues(newValues);

        // Tự động chuyển focus sang ô tiếp theo
        if (e.target.value) {
            if (index < length - 1) {
                const nextBox = document.getElementById(`box-${index + 1}`);
                if (nextBox) {
                    nextBox.focus();
                }
            }
        }
    };

    useEffect(() => {
        if (onChange) {
            onChange(values.join(''));
        }
    }, [values, onChange]);

    // Xử lý khi nhấn phím backspace để quay lại ô trước
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            const prevBox = document.getElementById(`box-${index - 1}`);
            if (prevBox) {
                prevBox.focus();
            }
        }
        if (e.key === 'ArrowRight' && index < length - 1) {
            const nextBox = document.getElementById(`box-${index + 1}`);
            if (nextBox) {
                nextBox.focus();
            }
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            const prevBox = document.getElementById(`box-${index - 1}`);
            if (prevBox) {
                prevBox.focus();
            }
        }
    };

    const handleKeyUp = (e, index) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const thisBox = document.getElementById(`box-${index}`) as HTMLInputElement;
            if (thisBox) {
                thisBox.select();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').replace(/\D/g, '').split('');
        const newValues = [...values];
        for (let i = 0; i < Math.min(paste.length, length); i++) {
            newValues[i] = paste[i];
        }
        setValues(newValues);
    };

    return (
        <div className="flex gap-2 mb-2">
            {values.map((value, index) => (
                <input
                    key={index}
                    id={`box-${index}`}
                    type="text"
                    value={value}
                    onInput={(e) => handleChange(e, index)}
                    onKeyUp={(e) => handleKeyUp(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-16 h-16 border border-gray-300 text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
                    style={{ backgroundColor: 'rgba(36, 195, 140, 0.2)', fontWeight: 'bold', fontSize: '1.5rem' }}
                    autoComplete="off"
                    autoFocus={index === 0}
                    maxLength={2}
                    onFocus={(e) => e.target.select()}
                    onPaste={handlePaste}
                />
            ))}
        </div>
    );
};

const OtpVerificationModal = ({ isVisible, phone, onRequestClose, onVerify }) => {
    const [otp, setOtp] = useState("");
    const censorPhone = phone.substring(0, 2) + '*****' + phone.substring(8, 10);
    const [cooldown, setCooldown] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setInterval(() => {
                setCooldown((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [cooldown]);

    const sendOtp = () => {
        api.post('/auth/request-otp/', { phone: phone });
    };
    
    useEffect(() => {
        if (isVisible) {
            sendOtp();
        }
        setError(null);
    }, [isVisible]);

    const handleVerify = () => {
        if (otp.length < 4) {
            setError("Mã OTP không hợp lệ");
            return;
        }
        api.post('/auth/verify-otp/', {
            phone: phone,
            otp: otp
        }).then(() => {
            onVerify();
        }).catch((e) => {
            switch (e.response.status) {
                case 400:
                    setError("Mã OTP không chính xác");
                    break;
                case 404:
                    setError("Số điện thoại không tồn tại");
                    break;
                case 403:
                    setError("Quá nhiều lần nhập sai, vui lòng thử lại sau");
                    break;
                default:
                    setError("Đã xảy ra lỗi, vui lòng thử lại sau");
                    break;
            }
        });
    };

    const handleResend = () => {
        if (cooldown === 0) {
            setCooldown(60);
            sendOtp();
        }
    };

    return (
        <Modal
            show={isVisible}
            contentLabel="OTP Verification Modal"
            className="otp-verification-modal"
            onHide={onRequestClose}
            centered
        >
            <Modal.Header closeButton className="border-0" />
            <Modal.Body className="align-center text-center flex flex-col">
                <h3 className="">Nhập mã OTP</h3>
                <p className="">Nhập mã OTP đã được gửi đến số {censorPhone}</p>
                <div className="flex justify-center">
                    <InputBoxes length={4} onChange={setOtp} />
                </div>
                <p className="text-center m-0">Chưa nhận được mã?</p>
                <button className="text-center text-green-500" onClick={handleResend} disabled={cooldown > 0}
                    style={{opacity: cooldown > 0 ? 0.5 : 1}}
                >
                    Gửi lại {cooldown > 0 && `(${cooldown}s)`}
                </button>
                {error && <p className="text-center text-red-500">{error}</p>}
                <button className="btn btn-custom mt-4 w-2/3 h-12 self-center"
                    style={{ backgroundColor: '#24C38C', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}
                    onClick={handleVerify}
                    disabled={otp.length < 4}
                >
                        Xác thực
                </button>
            </Modal.Body>
            <Modal.Footer className="border-0" />
        </Modal>
    );
};

const validPrefix = ['03', '05', '07', '08', '09'];
export const validate_vietnam_phone = (phone: string): boolean => {
    if (phone.length !== 10) return false;
    const prefix = phone.substring(0, 2);
    return validPrefix.includes(prefix);
}

export default OtpVerificationModal;