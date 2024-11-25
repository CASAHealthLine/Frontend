import React from 'react';
import { Logo } from '../Logo';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaThLarge } from 'react-icons/fa';

interface SidebarProps {
  setActiveSection: (section: string) => void;
}

const PatientSlider: React.FC<SidebarProps> = ({ setActiveSection }) => {
  const styles = {
    sidebar: {
      width: 'auto',
      backgroundColor: '#f9fafb',
      color: '#333',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh', // Chiếm toàn bộ chiều cao màn hình
      boxSizing: 'border-box',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    logoTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginLeft: '10px',
      color: '#000',
      whiteSpace: 'nowrap',
    },
    nav: {
      flexGrow: 1, // Đẩy các mục điều hướng lên trên
    },
    sectionTitle: {
      fontSize: '12px',
      fontWeight: 'bold',
      margin: '10px 0',
      color: '#999',
      textTransform: 'uppercase',
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      padding: '10px',
      textDecoration: 'none',
      color: '#333',
      borderRadius: '4px',
      marginBottom: '5px',
      transition: 'background-color 0.3s ease',
      whiteSpace: 'nowrap',
    },
    activeLink: {
      backgroundColor: '#e6f7ff',
      color: '#1890ff',
    },
    icon: {
      fontSize: '16px',
      marginRight: '10px',
    },
    footer: {
      marginTop: 'auto', // Đẩy phần footer xuống dưới
    },
    logout: {
      color: '#ff4d4f',
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.logoContainer}>
        <Logo />
        <h2 style={styles.logoTitle}>CASA HealthLine</h2>
      </div>
      <nav style={styles.nav}>
        <h3 style={styles.sectionTitle}>TỔNG QUAN</h3>
        <a
          href="#"
          onClick={() => setActiveSection('home')}
          style={styles.navLink}
        >
          <FaThLarge style={styles.icon} /> Trang chủ
        </a>
        <a
          href="#"
          onClick={() => setActiveSection('personalInfo')}
          style={{ ...styles.navLink, ...styles.activeLink }}
        >
          <FaUser style={styles.icon} /> Thông tin
        </a>
      </nav>
      <div style={styles.footer}>
        <h3 style={styles.sectionTitle}>KHÁC</h3>
        <a
          href="#"
          onClick={() => setActiveSection('settings')}
          style={styles.navLink}
        >
          <FaCog style={styles.icon} /> Cài đặt
        </a>
        <a
          href="#"
          onClick={() => setActiveSection('logout')}
          style={{ ...styles.navLink, ...styles.logout }}
        >
          <FaSignOutAlt style={styles.icon} /> Đăng xuất
        </a>
      </div>
    </div>
  );
};

export default PatientSlider;
