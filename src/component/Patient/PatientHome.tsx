import React from "react";
import WaitingInfo from "./WaitingInfo";
import Schedule from "./Schedule";

const PatientHome: React.FC = () => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      width: "100%",
      height: "100%",
      backgroundColor: "#cecece",
    },
    main: {
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
    },
    column: {
      flex: 1,
      display: "flex",
      flexDirection: "column" as const,
      gap: "60px",
    },
    header: {
      backgroundColor: "#23c38b",
      color: "white",
      padding: "20px 30px",
      borderRadius: "10px",
      width: "100%",
      marginTop: "20px",
      textAlign: "center" as const,
      height: "182px",
      gap: "10px",
    },
    learnMore: {
      backgroundColor: "white",
      color: "#4caf50",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    panel: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "28px",
    },
  };

  // Mock dữ liệu giả lập
  const mockWaitingInfo = {
    positionInQueue: 5,
    currentTime: "Ngày 25/4 năm 2024",
    nextAppointmentDate: "Ngày 29/4",
    location: "Phòng 101",
  };

  const mockSchedule = {
    upcoming: [
      {
        date: "29/4",
        description: "Khám bệnh (dự kiến)",
        location: "Phòng 101",
      },
    ],
    completed: [
      {
        date: "22/4",
        description: "Khám bệnh",
        location: "Phòng 101",
        time: "11:00",
      },
      {
        date: "15/4",
        description: "Khám bệnh",
        location: "Phòng 101",
        time: "11:00",
      },
    ],
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        {/* Cột 1: Header và Thông tin hàng chờ */}
        <div style={styles.column}>
          <div style={styles.header}>
            <h2>CASA HEALTHLINE</h2>
            <p>
              Hệ thống quản lý xếp hàng khám bệnh thông minh, quy trình và hỗ trợ
              hiệu quả cho cả bệnh nhân và bác sĩ.
            </p>
            <button style={styles.learnMore}>Learn More</button>
          </div>

          {/* Gọi component WaitingInfo */}
          <div style={styles.panel}>
            <WaitingInfo {...mockWaitingInfo} />
          </div>
        </div>

        {/* Cột 2: Lịch khám */}
        <div style={styles.column}>
          <div style={styles.panel}>
            <Schedule {...mockSchedule} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
