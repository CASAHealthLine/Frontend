import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../component/LoginForm';
import { RegisterForm } from '../component/RegisterForm';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Header } from '../component/Header';
import { Banner } from '../component/Banner';

export default function Entry() {
  const location = useLocation();
  const navigate = useNavigate();
  const [key, setKey] = useState('login');
  const [showModal, setShowModal] = useState(true);

  const handleFakeIp = async (e) => {
    e.preventDefault();
    const ip = e.target[0].value;
    localStorage.setItem('virtual_ip', ip);
    setShowModal(false);
  };

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (path === 'register' || path === 'login') {
      setKey(path);
    }
  }, [location.pathname]);

  const handleTabSelect = (k) => {
    setKey(k);
    navigate(`/${k}`);
  };

  return (
    <>
      <div className="">
        <Header />
        <div className="flex flex-col md:flex-row items-start justify-between min-h-screen pt-[2.5%]">
          {/* Banner bên trái */}
          <div className="w-2/3 mr-[2.5%]">
            <Banner />
          </div>
          {/* Form bên phải */}
          <div className="w-1/3 rounded-lg border-2 border-black mr-[2.5%]">
            <Tabs id="entry" activeKey={key} onSelect={handleTabSelect} className="nav-tabs nav-fill">
              <Tab eventKey="register" title="Đăng ký">
                <RegisterForm />
              </Tab>
              <Tab eventKey="login" title="Đăng nhập">
                <LoginForm />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <Modal show={showModal}
        size="sm"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <p className="text-center h5">Vì đây là trang demo, vui lòng cung cấp IP mà bạn muốn giả lập:</p>
          <Form onSubmit={handleFakeIp}>
            <input
              type="text"
              placeholder="IP Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <Button className="btn btn-custom mt-4 w-full" type="submit">Hoàn thành</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
    );
}
