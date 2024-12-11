import React from 'react';
import { Logo } from '../Logo';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaThLarge } from 'react-icons/fa';

interface SidebarProps {
  setActiveSection: (section: string) => void;
  activeSection: string; // New prop to track the active section
}

const PatientSlider: React.FC<SidebarProps> = ({ setActiveSection, activeSection }) => {
  const styles = {
    sidebar: {
      width: 'auto',
      backgroundColor: '#f9fafb',
      color: '#333',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
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
      flexGrow: 1,
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
      transition: 'background-color 0.3s ease, color 0.3s ease',
      whiteSpace: 'nowrap',
    },
    activeLink: {
      color: '#00bfa6', // Green color for active link
      fontWeight: 'bold', // Make it bold
    },
    icon: {
      fontSize: '16px',
      marginRight: '10px',
    },
    activeIcon: {
      color: '#00bfa6', // Green color for active icon
    },
    footer: {
      marginTop: 'auto',
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
          style={activeSection === 'home' ? { ...styles.navLink, ...styles.activeLink } : styles.navLink}
        >
          <FaThLarge style={activeSection === 'home' ? { ...styles.icon, ...styles.activeIcon } : styles.icon} />
          Trang chủ
        </a>
        <a
          href="#"
          onClick={() => setActiveSection('personalInfo')}
          style={activeSection === 'personalInfo' ? { ...styles.navLink, ...styles.activeLink } : styles.navLink}
        >
          <FaUser style={activeSection === 'personalInfo' ? { ...styles.icon, ...styles.activeIcon } : styles.icon} />
          Thông tin
        </a>
      </nav>
      <div style={styles.footer}>
        <h3 style={styles.sectionTitle}>KHÁC</h3>
        <a
          href="#"
          onClick={() => setActiveSection('settings')}
          style={activeSection === 'settings' ? { ...styles.navLink, ...styles.activeLink } : styles.navLink}
        >
          <FaCog style={activeSection === 'settings' ? { ...styles.icon, ...styles.activeIcon } : styles.icon} />
          Cài đặt
        </a>
        <a
          href="#"
          onClick={() => setActiveSection('logout')}
          style={activeSection === 'logout' ? { ...styles.navLink, ...styles.activeLink, ...styles.logout } : { ...styles.navLink, ...styles.logout }}
        >
          <FaSignOutAlt style={activeSection === 'logout' ? { ...styles.icon, ...styles.activeIcon } : styles.icon} />
          Đăng xuất
        </a>
      </div>
    </div>
  );
};

export default PatientSlider;
