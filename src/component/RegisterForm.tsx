import React , { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../index.css'
export const RegisterForm = () => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Ngăn form gửi yêu cầu HTTP
        navigate('/login'); // Chuyển hướng đến trang LoginForm
    };

    return (
        <div className="rounded-lg p-6 bg-white max-md:ml-0 max-md:w-full">
            <Form onSubmit={handleSubmit}>
                {/* Các trường nhập liệu của form đăng ký */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Họ"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Tên"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="tel"
                        placeholder="Số điện thoại"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="text-center">
                    <Button className="btn btn-custom" type="submit">Hoàn thành</Button>
                </div>
            </Form>
        </div>
    );
}

