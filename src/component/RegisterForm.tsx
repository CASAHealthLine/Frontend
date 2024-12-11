import React , { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css'
import api from '../api';
import OtpVerificationModal, { validate_vietnam_phone } from './OtpVerificationModal';
import FocusInput from './FocusRingInput';
import { IconButton } from '@mui/material';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        displayname: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [numberVerify, setNumberVerify] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null); // Xóa lỗi khi người dùng sửa đổi form
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kiểm tra khớp mật khẩu
        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
            return;
        }

        // Kiểm tra số điện thoại
        if (!numberVerify) {
            setError("Vui lòng xác thực số điện thoại trước khi đăng ký.");
            return;
        }

        try {
            const response = await api.post('/auth/register/', {
                display_name: formData.displayname,
                username: formData.phone,
                password: formData.password,
            });

            if (response.status === 201) {
                alert("Đăng ký tài khoản thành công. Vui lòng đăng nhập.");
                navigate('/login');
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
            setError("Không thể kết nối đến server. Vui lòng thử lại sau.");
        }
    };

    const handleVerify = async () => {
        const phone = formData.phone;
        if (!validate_vietnam_phone(phone)) {
            setError("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
            return;
        } else {
            setError(null);
            setModalVisible(true);
        }
    };

    return (
        <>
            <div className="rounded-lg p-6 bg-white max-md:ml-0 max-md:w-full">
                <Form onSubmit={handleSubmit}>
                    {/* Các trường nhập liệu của form đăng ký */}
                    <FocusInput
                        type='text' 
                        name='displayname' 
                        placeholder='Họ và tên' 
                        value={formData.displayname} 
                        onChange={handleChange} 
                        required maxLength={50} />
                    <FocusInput 
                        type='tel' 
                        name='phone' 
                        placeholder='Số điện thoại' 
                        value={formData.phone} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleChange(e);
                            setNumberVerify(false);
                        }}
                        required maxLength={10} 
                        minLength={10}
                    >
                        {formData.phone?.length == 10 && !numberVerify && (<a onClick={handleVerify} className="select-none text-blue-500 cursor-pointer">Xác thực</a>)}
                        {numberVerify && (<p className="select-none text-green-500 m-0">Đã xác thực</p>)}
                    </FocusInput>
                    <FocusInput
                        type={togglePassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Mật khẩu'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    >
                        <IconButton onClick={() => setTogglePassword(!togglePassword)}>
                            {togglePassword ? <EyeIcon size={24} color="#24C38C" /> : <EyeOffIcon size={24} color="#24C38C" />}
                        </IconButton>
                    </FocusInput>
                    <FocusInput
                        type={togglePassword ? 'text' : 'password'}
                        name='confirmPassword'
                        placeholder='Xác nhận mật khẩu'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <div className="text-center">
                        <Button className="btn btn-custom" type="submit">Hoàn thành</Button>
                    </div>
                </Form>
            </div>
            {modalVisible && <OtpVerificationModal
                isVisible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                onVerify={() => setNumberVerify(true)}
                phoneNumber={formData.phone}
                onlyVerify
                autoRequest
            />}
        </>
    );
}

