import { Plus, Trash2, SlidersHorizontal, Search } from "lucide-react";
import { useEffect, useState } from "react";
import "../styles/StaffList.css";
import { PatientPersonal } from "../component/patient/PatientPersonal";
import { PatientRecord } from "../component/patient/PatientRecord";
import { PatientStatus } from "../component/patient/PatientStatus";

const NavButton = ({ content }) => {
  return (
    <button type="button" className="">
      {content}
    </button>
  );
};

export const PatientInformation = () => {
  return (
    <div>
      <nav className="w-full">
        <div className="w-full">
          <button className="w-1/3">Thông Tin Cá Nhân</button>
          <button className="w-1/3">Hồ Sơ Bệnh Án</button>
          <button className="w-1/3">Trạng Thái</button>
        </div>
      </nav>
      <PatientPersonal />
      <PatientRecord />
      <PatientStatus />
    </div>
  );
};
