import React, { useEffect, useState } from "react";

interface Record {
  date: string;
  diagnosis: string;
  summary: string;
  testResults: string[];
  diagnosisResults: string[];
  prescriptions: string[];
}

const MedicalRecord: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMedicalRecords = async () => {
    setLoading(true);
    try {
      const fakeData: Record[] = [
        {
          date: "02/10/2024",
          diagnosis: "Trào ngược dịch dạ dày nhẹ",
          summary:
            "Ợ nóng, ợ chua. Người bệnh sẽ ợ hơi thường xuyên để đẩy bớt lượng khí trong dạ dày ra ngoài, giảm khó chịu cho dạ dày, buồn nôn, nôn, đắng miệng.",
          testResults: ["1.pdf", "2.pdf"],
          diagnosisResults: ["1.pdf"],
          prescriptions: ["1.pdf"],
        },
        {
          date: "05/11/2024",
          diagnosis: "Trào ngược dịch dạ dày nặng",
          summary:
            "Ợ nóng, ợ chua. Người bệnh sẽ ợ hơi thường xuyên để đẩy bớt lượng khí trong dạ dày ra ngoài, giảm khó chịu cho dạ dày, buồn nôn, nôn, đắng miệng.",
          testResults: ["1.pdf"],
          diagnosisResults: ["1.pdf"],
          prescriptions: ["1.pdf"],
        },
      ];
      setTimeout(() => {
        setRecords(fakeData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch medical records:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#fdfdfd",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        height: "500px", // Giới hạn chiều cao
        overflowY: "auto", // Cho phép cuộn theo chiều dọc
      }}
    >
      
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : records.length > 0 ? (
        records.map((record, index) => (
          <div
            className="record"
            key={index}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <div
              style={{
                backgroundColor: "#e9ecef",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                marginBottom: "1rem",
                fontWeight: "bold",
              }}
            >
              Ngày: {record.date}
            </div>
            <p>
              <strong>Chẩn Đoán:</strong> {record.diagnosis}
            </p>
            <p>
              <strong>Tóm Tắt Triệu Chứng:</strong> {record.summary}
            </p>
            <p>
              <strong>Kết Quả Xét Nghiệm:</strong>{" "}
              {record.testResults.map((result, idx) => (
                <a
                  href={result}
                  key={idx}
                  style={{
                    color: "#007bff",
                    textDecoration: "underline",
                    marginRight: "8px",
                  }}
                >
                  {idx + 1}.pdf
                </a>
              ))}
            </p>
            <p>
              <strong>Kết Quả Chẩn Đoán:</strong>{" "}
              {record.diagnosisResults.map((result, idx) => (
                <a
                  href={result}
                  key={idx}
                  style={{
                    color: "#007bff",
                    textDecoration: "underline",
                    marginRight: "8px",
                  }}
                >
                  {idx + 1}.pdf
                </a>
              ))}
            </p>
            <p>
              <strong>Đơn Thuốc:</strong>{" "}
              {record.prescriptions.map((prescription, idx) => (
                <a
                  href={prescription}
                  key={idx}
                  style={{
                    color: "#007bff",
                    textDecoration: "underline",
                    marginRight: "8px",
                  }}
                >
                  {idx + 1}.pdf
                </a>
              ))}
            </p>
          </div>
        ))
      ) : (
        <p style={{ fontSize: "1rem", color: "#6c757d" }}>
          Không có hồ sơ bệnh án nào.
        </p>
      )}
    </div>
  );
};

export default MedicalRecord;
