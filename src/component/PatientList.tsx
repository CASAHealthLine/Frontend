import React, { useEffect, useState } from 'react';
import '../index.css';
type Patient = {
    id: number;
    name: string;
    gender: string;
    birthday: string;
    cccd: number;
};

export const PatientList = () => {
    const [patientData, setPatientData] = useState<Patient[]>([]);

    useEffect(() => {
        const fetchPatientData = async () => {
          try {
            const response = await fetch('/data/patient.json'); // Đường dẫn đến file JSON
            const data = await response.json();
            setPatientData(data); // Cập nhật state với dữ liệu JSON
          } catch (error) {
            console.error('Error loading Patient data:', error);
          }
        };
    
        fetchPatientData(); // Gọi hàm bất đồng bộ
      }, []); // Chạy một lần khi component được mount

    return (
        <div className="flex flex-col pt-[2.5%]">
            <div>
                <h1 className="text-2xl font-bold mb-4 pl-[5.5%]">Danh sách bệnh nhân</h1>
            </div>
            <div className="flex justify-center w-full">
                <table className="w-[90%]">
                    <thead className="table-dark">
                        <tr>
                            <th className="px-4 py-2 border-white border-8 text-center ">ID</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Họ tên</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Giới tính</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Ngày sinh</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Cccd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientData.map((patient) => (
                            <tr key={patient.id}>
                                <td className="px-4 py-2 text-center">{patient.id}</td>
                                <td className="px-4 py-2 text-center">{patient.name}</td>
                                <td className="px-4 py-2 text-center">{patient.gender}</td>
                                <td className="px-4 py-2 text-center">{patient.birthday}</td>
                                <td className="px-4 py-2 text-center">{patient.cccd}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};
