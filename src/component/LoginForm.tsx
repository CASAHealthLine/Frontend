import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../index.css'
export const LoginForm = () => {
  return (
      <div className="rounded-lg p-6 bg-white max-md:ml-0 max-md:w-full">
        <Form>
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
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="text-center">
            <Button className="btn btn-custom" type="submit">Hoàn thành</Button>
          </div>
        </Form>
        <div className="text-center mt-4">
          <a href="#" className="hover:underline text-black">Bạn quên mật khẩu à?</a>
        </div>
      </div>
  );
};
