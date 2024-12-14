import React, { useState, useEffect } from "react";
import PersonalInfo from "./PersonalInfo";
import MedicalRecord from "./MedicalRecord";
import { FaUserCircle } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

const PatientInfo = () => {
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    // Tải dữ liệu từ JSON
    fetch("/persionalData.json")
      .then((response) => response.json())
      .then((data) => setPatientInfo(data))
      .catch((error) => console.error("Error fetching patient info:", error));
  }, []);

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      width: "100%",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "#cecece",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      padding: "10px 20px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    userDetails: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    userAvatar: {
      fontSize: "48px",
      color: "#6c757d",
    },
    userInfo: {
      lineHeight: "1.5",
    },
    userName: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    verification: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "16px",
      color: "#28a745",
      fontWeight: "bold",
    },
    tabNavigation: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
      backgroundColor: "#22b57f",
      borderRadius: "12px",
      color: "#fff",
      fontWeight: "bold",
    },
    tabButton: {
      flex: 1,
      textAlign: "center",
      padding: "10px",
      cursor: "pointer",
      borderRadius: "12px",
      transition: "background-color 0.3s ease",
    },
    activeTabButton: {
      backgroundColor: "#fff",
      color: "#28a745",
    },
    content: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.userDetails}>
          <div style={styles.userAvatar}>
            <FaUserCircle />
          </div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>
              {patientInfo ? patientInfo.name : "Đang tải..."}
            </div>
            <div>ID: {patientInfo ? patientInfo.idNumber : "N/A"}</div>
            <div>Giới Tính: {patientInfo ? patientInfo.gender : "N/A"}</div>
            <div>Ngày Sinh: {patientInfo ? patientInfo.dob : "N/A"}</div>
          </div>
        </div>
        <div style={styles.verification}>
          <MdCheckCircle />
          Đã Xác Thực
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabNavigation}>
        <div
          style={{
            ...styles.tabButton,
            ...(activeSection === "personalInfo" ? styles.activeTabButton : {}),
          }}
          onClick={() => setActiveSection("personalInfo")}
        >
          Thông Tin Cá Nhân
        </div>
        <div
          style={{
            ...styles.tabButton,
            ...(activeSection === "medicalRecord" ? styles.activeTabButton : {}),
          }}
          onClick={() => setActiveSection("medicalRecord")}
        >
          Hồ Sơ Bệnh Án
        </div>
        <div
          style={{
            ...styles.tabButton,
            ...(activeSection === "status" ? styles.activeTabButton : {}),
          }}
          onClick={() => setActiveSection("status")}
        >
          Trạng Thái
        </div>
      </div>

      {/* Content Section */}
      <div style={styles.content}>
        {activeSection === "personalInfo" && patientInfo && (
          <PersonalInfo {...patientInfo} />
        )}
        {activeSection === "medicalRecord" && <MedicalRecord />}
        {activeSection === "status" && (
          <p>Trạng thái của bệnh nhân sẽ hiển thị tại đây.</p>
        )}
      </div>
    </div>
  );
};

export default PatientInfo;
