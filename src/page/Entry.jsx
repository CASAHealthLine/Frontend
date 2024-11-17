import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../component/LoginForm';
import { RegisterForm } from '../component/RegisterForm';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Header } from '../component/Header';
import { Banner } from '../component/Banner';

export default function Entry() {
  const location = useLocation();
  const navigate = useNavigate();
  const [key, setKey] = useState('login');

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
    <div>
      <Header />
      <div className="flex flex-col md:flex-row items-center justify-between min-h-screen">
        {/* Banner bên trái */}
        <div className="w-2/3 p-8">
          <Banner />
        </div>
        {/* Form bên phải */}
        <div className="w-1/3 p-8 rounded-lg border-2 border-black">
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
    );
}
