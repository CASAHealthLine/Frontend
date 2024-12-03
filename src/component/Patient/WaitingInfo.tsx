import React from "react";

interface WaitingInfoProps {
  positionInQueue: number;
  currentTime: string;
  nextAppointmentDate: string;
  location: string;
}

const WaitingInfo: React.FC<WaitingInfoProps> = ({
  positionInQueue,
  currentTime,
  nextAppointmentDate,
  location,
}) => {
  const styles = {
    container: {
      textAlign: "center" as const,
    },
    date: {
      color: "red",
      fontWeight: "bold" as const,
    },
    location: {
      fontWeight: "bold" as const,
    },
    clock: {
      width: "100px",
      height: "100px",
      margin: "20px auto",
      border: "5px solid #ddd",
      borderRadius: "50%",
    },
  };

  return (
    <div style={styles.container}>
      <h3>Vị trí trong hàng chờ: {positionInQueue}</h3>
      <p>Thời gian hiện tại</p>
      <p>{currentTime}</p>
      <div style={styles.clock}></div>
      <p>
        Lần khám dự kiến gần nhất tiếp theo của bạn là:
        <br />
        <span style={styles.date}>{nextAppointmentDate}</span>
        <br />
        <span style={styles.location}>Địa điểm: {location}</span>
      </p>
    </div>
  );
};

export default WaitingInfo;
