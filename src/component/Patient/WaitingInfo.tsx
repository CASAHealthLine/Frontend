import React from "react";
import { useEffect, useState } from "react";
import { Clock, CalendarDays } from "lucide-react";

interface WaitingInfoProps {
  positionInQueue: number;
  currentTime: string;
  nextAppointmentDate: string;
  location: string;
}
const Time: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hourRotation = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;
  const minuteRotation = time.getMinutes() * 6;

  return (
    <div className="flex flex-col items-center w-full mt-6">
      {/* Clock Section */}
      <div className="relative flex items-center justify-center w-64 h-64 rounded-full border-2 border-gray-300">
        {/* Center Dot */}
        <div className="absolute w-4 h-4 bg-purple-600 rounded-full"></div>

        {/* Hour Hand */}
        <div
          className="absolute bg-purple-600"
          style={{
            width: "6px", // Width of hour hand
            height: "45px", // Length of hour hand
            transformOrigin: "50% 100%", // Rotate from the bottom center
            transform: `rotate(${hourRotation}deg)`,
            bottom: "50%", // Align with the center vertically
          }}
        ></div>

        {/* Minute Hand */}
        <div
          className="absolute bg-gray-700"
          style={{
            width: "4px", // Width of minute hand
            height: "60px", // Length of minute hand
            transformOrigin: "50% 100%", // Rotate from the bottom center
            transform: `rotate(${minuteRotation}deg)`,
            bottom: "50%", // Align with the center vertically
          }}
        ></div>

        {/* Clock Numbers */}
        {[...Array(12)].map((_, index) => (
          <span
            key={index}
            className="absolute text-gray-700 text-sm"
            style={{
              transform: `rotate(${index * 30}deg) translate(0, -80px) rotate(${-index * 30}deg)`,
            }}
          >
            {index === 0 ? 12 : index}
          </span>
        ))}
      </div>

      {/* Date and Time */}
      <div className="mt-4 text-center">
        <p className="text-xl flex items-center justify-center mt-2">
          <Clock className="w-6 h-6 mr-2" />
          {time.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
const WaitingInfo: React.FC<WaitingInfoProps> = ({
  positionInQueue,
  nextAppointmentDate,
  location,
}) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row" as const,
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      maxWidth: "600px",
      margin: "0 auto",
    },
    textContainer: {
      flex: 1,
      textAlign: "left" as const,
      marginRight: "20px",
    },
    timeSection: {
      flex: 1,
      textAlign: "center" as const,
      gap:"40px"
    },
    date: {
      color: "red",
      fontWeight: "bold" as const,
      fontSize: "20px",
    },
    location: {
      color: "#ff6600",
      fontWeight: "bold" as const,
      fontSize: "18px",
    },
    clock: {
      width: "150px",
      height: "150px",
      margin: "0 auto",
    },
  };

  return (
    <div style={styles.container}>
      {/* Left side: Queue position and appointment info */}
      <div style={styles.textContainer}>
        <h3>Vị trí trong hàng chờ: {positionInQueue}</h3>
        <p>
          Lần khám dự kiến gần nhất tiếp theo của bạn là:
          <br />
          <span style={styles.date}>{nextAppointmentDate}</span>
          <br />
          <span style={styles.location}>Địa điểm: {location}</span>
        </p>
      </div>

      {/* Right side: Time and clock */}
      <div style={styles.timeSection}>
        <p>Thời gian hiện tại</p>
        <Time />
      </div>
    </div>
  );
};


export default WaitingInfo;
