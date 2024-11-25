import React, { useState } from "react";
import MedicalRecord from "../component/Patient/MedicalRecord";
import PersonalInfo from "../component/Patient/PersonalInfo";
import { FaUserCircle, FaCheckCircle } from "react-icons/fa";

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState("personalInfo");

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      width: "100%",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "#cecece",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      padding: "20px",
      borderRadius: "12px",
      backgroundColor: "#f8f9fa",
      borderBottom: "2px solid #e0e0e0",
    },
    userDetails: {
      display: "flex",
      alignItems: "center",
    },
    userAvatar: {
      marginRight: "20px",
    },
    userInfo: {
      lineHeight: "1.5",
    },
    verificationStatus: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#28a745",
      fontWeight: "bold",
    },
    tabNavigation: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    tabButton: {
      flex: 1,
      textAlign: "center",
      padding: "12px 16px",
      fontWeight: "bold",
      cursor: "pointer",
      border: "none",
      backgroundColor: "transparent",
      color: "#333",
      position: "relative",
      transition: "all 0.3s ease",
    },
    activeTabButton: {
      color: "#28a745",
      fontWeight: "bold",
      borderBottom: "3px solid #28a745",
    },
    content: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      minHeight: "300px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.userDetails}>
          <div style={styles.userAvatar}>
            <FaUserCircle size={64} />
          </div>
          <div style={styles.userInfo}>
            <h1>Nguyễn Văn B</h1>
            <p>ID: 22021101</p>
            <p>Giới Tính: Nam</p>
            <p>Ngày Sinh: 01/03/2001</p>
          </div>
        </div>
        <div style={styles.verificationStatus}>
          <p>Đã Xác Thực</p>
          <div
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#28a745",
              borderRadius: "50%",
              color: "#fff",
            }}
          >
            <FaCheckCircle size={16} />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabNavigation}>
        <button
          style={{
            ...styles.tabButton,
            ...(activeSection === "personalInfo" ? styles.activeTabButton : {}),
          }}
          onClick={() => setActiveSection("personalInfo")}
        >
          Thông Tin Cá Nhân
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeSection === "medicalRecord" ? styles.activeTabButton : {}),
          }}
          onClick={() => setActiveSection("medicalRecord")}
        >
          Hồ Sơ Bệnh Án
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeSection === "status" ? styles.activeTabButton : {}),
          }}
          onClick={() => setActiveSection("status")}
        >
          Trạng Thái
        </button>
      </div>

      {/* Content Section */}
      <div style={styles.content}>
        {activeSection === "personalInfo" && <PersonalInfo />}
        {activeSection === "medicalRecord" && <MedicalRecord />}
        {activeSection === "status" && (
          <div>
            <h2>Trạng Thái</h2>
            <p>Trạng thái của bệnh nhân sẽ hiển thị tại đây.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
