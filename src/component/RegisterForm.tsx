import React , { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../index.css'
import api from '../api';
export const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        displayname: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string | null>(null);

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


    return (
        <div className="rounded-lg p-6 bg-white max-md:ml-0 max-md:w-full">
            <Form onSubmit={handleSubmit}>
                {/* Các trường nhập liệu của form đăng ký */}
                <div className="mb-4">
                    <input
                        type="text"
                        name="displayname"
                        placeholder="Họ và tên"
                        value={formData.displayname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="text-center">
                    <Button className="btn btn-custom" type="submit">Hoàn thành</Button>
                </div>
            </Form>
        </div>
    );
}

