import React from "react";
import { FaSave, FaTimes } from "react-icons/fa";

interface PersonalInfoProps {
  name: string;
  gender: string;
  dob: string;
  address: string;
  idNumber: string;
  email: string;
  phone: string;
  occupation: string;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  name,
  gender,
  dob,
  address,
  idNumber,
  email,
  phone,
  occupation,
}) => {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#fdfdfd",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        marginBottom: "1rem",
      }}
    >
      
      <div style={{ marginBottom: "1rem" }}>
        <p><strong>Họ Tên:</strong> {name || "---"}</p>
        <p><strong>Giới Tính:</strong> {gender || "---"}</p>
        <p><strong>Ngày Sinh:</strong> {dob || "--/--/----"}</p>
        <p><strong>Địa Chỉ Thường Trú:</strong> {address || "---"}</p>
        <p><strong>Mã CCCD:</strong> {idNumber || "---"}</p>
        <p><strong>Email:</strong> {email || "---"}</p>
        <p><strong>Số Điện Thoại:</strong> {phone || "---"}</p>
        <p><strong>Nghề Nghiệp:</strong> {occupation || "---"}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          <FaSave /> Lưu
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          <FaTimes /> Hủy Bỏ
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;