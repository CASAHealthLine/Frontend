import React, { useState, useEffect }from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import { IdCard, LayoutGrid, Users, Network, ChartColumnBig, Stethoscope, PillBottle, Settings, LogOut } from 'lucide-react';
import { NavbarBrand } from 'react-bootstrap';
import '../styles/Sidebar.css';
import { SidebarHeader, Typography } from './Typography';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';

const menuItems = [
  { icon: <LayoutGrid />, to: '/', label: 'Trang chủ' },
  { icon: <IdCard />, to: '/patient', label: 'Bệnh nhân' },
  { icon: <IdCard />, to: '/info', label: 'Thông tin' },
  { icon: <Users />, to: '/queue', label: 'Hàng đợi' },
  { icon: <Network />, to: '/staff', label: 'Nhân viên' },
  { icon: <ChartColumnBig />, to: '/statistic', label: 'Thống kê' },
  { icon: <Stethoscope />, to: '/rooms', label: 'Phòng khám' },
  { icon: <PillBottle />, to: '/test', label: 'Xét nghiệm' },
];

const StyledMenu = ({ children, collapsed, ...props }) => {
  return (
    <Menu
      menuItemStyles={{
        label: () => {
          return {
            display: collapsed ? 'none' : 'block',
          };
        },
        icon: () => {
          return {
            marginRight: 0,
          };
        },
      }}
      {...props}
    >
      {children}
    </Menu>
  );
}

const StyledMenuItem = ({ children, icon, to, ...props }) => {
  const selectedColor = 'var(--primary-bg-color)';
  return (
    <NavLink to={to}
      style={{
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      {({isActive}) => (
        <MenuItem icon={icon}
          style={{
            color: isActive ? selectedColor : 'inherit',
          }}
          component={<div className='flex-row gap-2.5 justify-center'></div>}
          {...props}
        >
          {children}
        </MenuItem>
      )}
    </NavLink>
  );
};

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
        className='text-base font-medium relative inset-y-0 left-0'
        transitionDuration={0}
      >
        <div className='relative gap-y-6 sidebar-container py-2.5 h-full'>
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
          <StyledMenu collapsed={collapsed}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ 
                letterSpacing: '0.5px',
                color: collapsed ? 'transparent' : '#969696', 
              }}
              className='px-6 w-auto'
            >
              TỔNG QUAN
            </Typography>
            {menuItems.map((item, index) => (
              <StyledMenuItem key={index} icon={item.icon} to={item.to}>{item.label}</StyledMenuItem>
            ))}
          </StyledMenu>

          <StyledMenu className='mt-auto' collapsed={collapsed}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ 
                letterSpacing: '0.5px',
                color: collapsed ? 'transparent' : '#969696', 
              }}
              className='px-6 w-auto'
            >
              KHÁC
            </Typography>
            <StyledMenuItem icon={<Settings />} to={'/setting'}>Cài đặt</StyledMenuItem>
            <StyledMenuItem icon={<LogOut />} to={'/logout'}
              style={{
                color: logoutColor,
              }}
            >Đăng xuất</StyledMenuItem>
          </StyledMenu>
        </div>
      </ProSidebar>
  );
};