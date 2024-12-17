import React from "react";
import WaitingInfo from "./WaitingInfo";
import Schedule from "./Schedule";
import { Banner } from "../Banner";
import { display, height } from "@mui/system";

const PatientHome: React.FC = () => {
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
        fromDate: new Date("2024-04-29"),
        description: "Khám bệnh (dự kiến)",
        location: "Phòng 101",
      },
      {
        fromDate: new Date("2024-04-04 08:00"),
        toDate: new Date("2024-04-04 08:30"),
        description: "Khám bệnh",
        location: "Phòng 101",
      },
    ],
    completed: [
      {
        fromDate: new Date("2024-04-11 08:00"),
        toDate: new Date("2024-04-11 08:30"),
        description: "Khám bệnh",
        location: "Phòng 101",
      },
      {
        fromDate: new Date("2024-04-04 08:00"),
        toDate: new Date("2024-04-04 08:30"),
        description: "Khám bệnh",
        location: "Phòng 101",
      },
      {
        fromDate: new Date("2024-04-04 08:00"),
        toDate: new Date("2024-04-04 08:30"),
        description: "Khám bệnh",
        location: "Phòng 101",
      },
      {
        fromDate: new Date("2024-04-04 08:00"),
        toDate: new Date("2024-04-04 08:30"),
        description: "Khám bệnh",
        location: "Phòng 101",
      },
      {
        fromDate: new Date("2024-04-04 08:00"),
        toDate: new Date("2024-04-04 08:30"),
        description: "Khám bệnh",
        location: "Phòng 101",
      },
    ],
  };

  return (
    <div className="flex flex-row w-full h-full">
        {/* Cột 1: Header và Thông tin hàng chờ */}

        {/* Cột 2: Lịch khám */}
          <Schedule {...mockSchedule} />
    </div>
  );
};

export default PatientHome;
