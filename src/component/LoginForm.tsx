import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../index.css'
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Modal from 'react-bootstrap/Modal';
import OtpVerificationModal from './OtpVerificationModal';
import FocusRingInput from './FocusRingInput';
import ResetPasswordModal from './ResetPasswordModal';
import { IconButton } from '@mui/material';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Khởi tạo hook navigate
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  // Hàm xử lý khi ấn "Hoàn thành"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn refresh trang
    api.post('/auth/login/', {
      username: (e.target as any)[0].value,
      password: (e.target as any)[1].value
    }).then((res) => {
      localStorage.setItem('access_token', res.data.access);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/'); // Chuyển hướng về trang chính
    }).catch((err) => {
      setError('Số điện thoại hoặc mật khẩu không đúng');
    });
  };

  return (
    <>
      <div className="rounded-lg p-6 bg-white max-md:ml-0 max-md:w-full">
        <Form onSubmit={handleSubmit}>
          <FocusRingInput
            type='text'
            name='username'
            placeholder='Số điện thoại / Tên đăng nhập'
            value=''
            required
          />
          <FocusRingInput
            type={togglePassword ? 'text' : 'password'}
            name='password'
            placeholder='Nhập mật khẩu'
            value=''
            required
          >
            <IconButton onClick={() => setTogglePassword(!togglePassword)}>
              {togglePassword ? <EyeIcon size={24} color="#24C38C" /> : <EyeOffIcon size={24} color="#24C38C" />}
            </IconButton> 
          </FocusRingInput>
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="text-center">
            <Button className="btn btn-custom" type="submit">Hoàn thành</Button>
          </div>
        </Form>
        <div className="text-center mt-4">
          <a href='#' onClick={() => setResetModalVisible(true)} className="hover:underline text-black">Quên mật khẩu?</a>
        </div>
      </div>
      {resetModalVisible && <ResetPasswordModal
        isVisible={resetModalVisible}
        onRequestClose={() => setResetModalVisible(false)}
      />}
    </>
  );
};
