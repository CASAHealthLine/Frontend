import React from 'react';
import { FaArrowLeft, FaClock, FaBell, FaUserCircle } from 'react-icons/fa';
import { CSSProperties } from 'react';

const PatientTopbar: React.FC = () => {
  const topbarStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2ecc71',
    padding: '10px 20px',
    color: '#fff',
    height: '50px',
  };

  const leftSectionStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const rightSectionStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle: CSSProperties = {
    marginRight: '15px',
    fontSize: '1.5rem',
    cursor: 'pointer',
  };

  const timeStyle: CSSProperties = {
    fontSize: '1rem',
    fontWeight: 'bold',
  };

  const userStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  };

  return (
    <div style={topbarStyle}>
      <div style={leftSectionStyle}>
        <FaArrowLeft style={iconStyle} />
        <div style={timeStyle}>08:56 AM</div>
      </div>
      <div style={rightSectionStyle}>
        <FaClock style={iconStyle} />
        <FaBell style={iconStyle} />
        <div style={userStyle}>
          <FaUserCircle style={{ fontSize: '2rem', marginRight: '10px' }} /> Nguyễn Văn A
        </div>
      </div>
    </div>
  );
};

export default PatientTopbar;
