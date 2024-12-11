import React from "react";

interface Appointment {
  date: string;
  description: string;
  location: string;
  time?: string; // Optional nếu không cần thời gian cho lịch sắp tới
}

interface ScheduleProps {
  upcoming: Appointment[];
  completed: Appointment[];
}

const Schedule: React.FC<ScheduleProps> = ({ upcoming, completed }) => {
  const styles = {
    container: {
      textAlign: "center" as const,
      width: "100%",
    },
    section: {
      marginBottom: "20px",
    },
    title: {
      color: "#4caf50",
      fontWeight: "bold" as const,
    },
    appointment: {
      backgroundColor: "#f9f9f9",
      padding: "10px",
      borderRadius: "8px",
      margin: "10px 0",
    },
    date: {
      color: "red",
      fontWeight: "bold" as const,
    },
    location: {
      fontWeight: "bold" as const,
    },
  };

  return (
    <div style={styles.container}>
      <h3>Lịch khám</h3>

      {/* Lịch sắp tới */}
      <div style={styles.section}>
        <h4 style={styles.title}>Sắp tới ({upcoming.length})</h4>
        {upcoming.map((appt, index) => (
          <div key={index} style={styles.appointment}>
            <p style={styles.date}>{appt.date}</p>
            <p>{appt.description}</p>
            <p style={styles.location}>Địa điểm: {appt.location}</p>
          </div>
        ))}
      </div>

      {/* Lịch đã hoàn thành */}
      <div style={styles.section}>
        <h4 style={styles.title}>Đã hoàn thành ({completed.length})</h4>
        {completed.map((appt, index) => (
          <div key={index} style={styles.appointment}>
            <p>{appt.date}</p>
            <p>{appt.description}</p>
            <p>Thời gian: {appt.time}</p>
            <p style={styles.location}>Địa điểm: {appt.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
