import React, { useEffect, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

interface PersonalInfoData {
  name: string;
  gender: string;
  dob: string;
  address: string;
  idNumber: string;
  email: string;
  phone: string;
  occupation: string;
}

const PersonalInfo: React.FC = () => {
  const [data, setData] = useState<PersonalInfoData | null>(null);

  useEffect(() => {
    // Load dữ liệu từ file JSON
    fetch("/persionalData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
      {data ? (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <p><strong>Họ Tên:</strong> {data.name || "---"}</p>
            <p><strong>Giới Tính:</strong> {data.gender || "---"}</p>
            <p><strong>Ngày Sinh:</strong> {data.dob || "--/--/----"}</p>
            <p><strong>Địa Chỉ Thường Trú:</strong> {data.address || "---"}</p>
            <p><strong>Mã CCCD:</strong> {data.idNumber || "---"}</p>
            <p><strong>Email:</strong> {data.email || "---"}</p>
            <p><strong>Số Điện Thoại:</strong> {data.phone || "---"}</p>
            <p><strong>Nghề Nghiệp:</strong> {data.occupation || "---"}</p>
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
        </>
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
};

export default PersonalInfo;
