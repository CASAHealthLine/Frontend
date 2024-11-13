import React, { useState, useEffect }from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import { Cross, IdCard, LayoutGrid, Users, Network, ChartColumnBig, Stethoscope, PillBottle, Settings, LogOut } from 'lucide-react';
import { NavbarBrand } from 'react-bootstrap';
import '../styles/Sidebar.css';
import { SidebarHeader, Typography } from './Typography';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const menuItems = [
  { icon: <LayoutGrid />, to: '/', label: 'Trang chủ' },
  { icon: <IdCard />, to: '/', label: 'Bệnh nhân' },
  { icon: <IdCard />, to: '/', label: 'Thông tin' },
  { icon: <Users />, to: '/', label: 'Hàng đợi' },
  { icon: <Network />, to: '/', label: 'Nhân viên' },
  { icon: <ChartColumnBig />, to: '/', label: 'Thống kê' },
  { icon: <Stethoscope />, to: '/', label: 'Phòng khám' },
  { icon: <PillBottle />, to: '/', label: 'Xét nghiệm' },
];

export const Sidebar = () => {
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

  const logoutColor = '#FE5620';

  return (
      <ProSidebar
        collapsed={collapsed}
        breakPoint="sm"
        width='210px'
        className='text-base font-medium h-dvh'
      >
        <div className='gap-y-6 sidebar-container h-full'>
          <NavbarBrand href="/" className='justify-center place-items-center min-h-16 h-16' >
            <SidebarHeader 
              logo={<Logo size={40} stroke='white'/>}
              title='CASA HealthLine'
              style={{
                width: '200px',
              }}
              displayTitle={!collapsed}
            >
            </SidebarHeader>
          </NavbarBrand>
          <Menu>
            <div className='px-6'
              style={{
                opacity: collapsed ? 0 : 0.7, 
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ 
                  letterSpacing: '0.5px' 
                }}
              >
                TỔNG QUAN
              </Typography>
            </div>
            {menuItems.map((item, index) => (
              <MenuItem
                icon={item.icon}
                component={<NavLink to={item.to} />}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

          <Menu className='mt-auto'>
            <div className='px-6'
              style={{
                opacity: collapsed ? 0 : 0.7, 
              }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                KHÁC
              </Typography>
            </div>
            <MenuItem icon={<Settings />} component={<NavLink to={'/'} />}>Cài đặt</MenuItem>
            <MenuItem 
              icon={<LogOut stroke={logoutColor}/>}
              style={{
                color: logoutColor,
              }}
            >Đăng xuất</MenuItem>
          </Menu>
        </div>
      </ProSidebar>
  );
};