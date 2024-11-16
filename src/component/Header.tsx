import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import { Logo } from './Logo';

export const Header = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 576 && width < 768) {
        setCollapsed(true);
      } else if (width >= 768) {
        setCollapsed(false);
      }

      return width;
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex items-center min-h-16 h-16 ml-8">
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