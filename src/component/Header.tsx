import React from 'react';
import '../styles/Header.css';
import { Logo } from './Logo';

export const Header = () => {

  return (
    <div className="flex items-center min-h-16 h-16 ml-8 max-md:max-w-full">
      {/* Logo */}
      <div className="mr-2">
        <Logo size={40} stroke="white" />
      </div>

      {/* CASA và HealthLine */}
      <div className="text-pretty text-xl font-sans font-semibold">
        <div>CASA</div>
        <div>HealthLine</div>
      </div>
      <div className="text-3xl font-sans font-bold uppercase pl-10  ">
        <div>Cổng thông tin hàng chờ bệnh nhân</div>
      </div>
    </div>
  );
};