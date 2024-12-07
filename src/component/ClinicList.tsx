import React, { useEffect, useState } from 'react';
import '../index.css';
type Clinic = {
    id: number;
    room: string;
    name: string;
    address: string;
    people: number;
};

export const ClinicList = () => {
    const [clinicData, setClinicData] = useState<Clinic[]>([]);

    useEffect(() => {
        const fetchClinicData = async () => {
          try {
            const response = await fetch('/data/clinic_list.json'); // Đường dẫn đến file JSON
            const data = await response.json();
            setClinicData(data); // Cập nhật state với dữ liệu
          } catch (error) {
            console.error('Error loading test data:', error);
          }
        };
    
        fetchClinicData(); // Gọi hàm bất đồng bộ
      }, []); // Chạy một lần khi component mount

    return (
        <div className="flex flex-col pt-[2.5%]">
            <div>
                <h1 className="text-2xl font-bold mb-4 pl-[5.5%]">Danh sách phòng khám</h1>
            </div>
            <div className="flex justify-center w-full">
                <table className="w-[90%]">
                    <thead className="table-dark">
                        <tr>
                            <th className="px-4 py-2 border-white border-8 text-center">ID</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Tên phòng</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Người phụ trách</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Địa chỉ</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Người đợi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clinicData.map((clinic) => (
                            <tr key={clinic.id}>
                                <td className="px-4 py-2 text-center">{clinic.id}</td>
                                <td className="px-4 py-2 text-center">{clinic.room}</td>
                                <td className="px-4 py-2 text-center">{clinic.name}</td>
                                <td className="px-4 py-2 text-center">{clinic.address}</td>
                                <td className="px-4 py-2 text-center">{clinic.people}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};
