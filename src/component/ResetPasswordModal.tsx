import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import FocusRingInput from "./FocusRingInput";
import { Button, Form } from "react-bootstrap";
import OtpVerificationModal from "./OtpVerificationModal";
import api from "../api";

const ResetPasswordModal = ({ isVisible, onRequestClose, }: { isVisible: boolean, onRequestClose: () => void }) => {
    const [error, setError] = useState<string | null>(null);
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(isVisible);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const confirmPassword = (e.target as any)[1].value;

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
            return;
        }

        try {
            const response = await api.post('/auth/request-reset-password/', {
                'username': username,
            });

            if (response.status === 200) {
                setOtpModalVisible(true);
                setPasswordModalVisible(false);
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
            setError("Không thể kết nối đến server. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            {otpModalVisible && <OtpVerificationModal
                isVisible={otpModalVisible}
                onRequestClose={() => {
                    setOtpModalVisible(false);
                    setPasswordModalVisible(true);
                }}
                onVerify={(otp) => {
                    api.post('/auth/reset-password/', {
                        'username': username,
                        'password': password,
                        'otp': otp,
                    }).then(() => {
                        alert("Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.");
                        onRequestClose();
                    }).catch(() => {
                        setError("Mã OTP không đúng. Vui lòng kiểm tra lại.");
                    });
                }}
                onlyVerify
            />}
            {passwordModalVisible && 
            <Modal
                show={isVisible}
                onHide={() => onRequestClose()}
                centered
            >
                <Modal.Header closeButton className="border-0"/>
                <Modal.Body>
                    <Form onSubmit={handleResetPassword} className="flex flex-col px-5">
                    <h3 className="text-center mb-8">Đặt lại mật khẩu</h3>
                    <FocusRingInput
                        type='text'
                        name='username'
                        placeholder='Số điện thoại / Tên đăng nhập'
                        value='' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                    <FocusRingInput
                        type='password'
                        name='password'
                        placeholder='Mật khẩu'
                        value='' required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <FocusRingInput
                        type='password'
                        name='confirmPassword'
                        placeholder='Xác nhận mật khẩu'
                        value='' required
                    />
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <Button className="btn btn-custom mt-4 w-2/3 h-12 self-center border-0"
                        style={{ backgroundColor: '#24C38C', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}
                        type='submit'
                    >
                        Hoàn thành
                    </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0"/>
            </Modal>}
        </>
    );
};

export default ResetPasswordModal;