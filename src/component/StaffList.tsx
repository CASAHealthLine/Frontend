import React, { useEffect, useState } from 'react';
import '../index.css';
type Staff = {
    id: number;
    name: string;
    gender: string;
    birthday: string;
    role: string;
};

export const StaffList = () => {
    const [staffData, setStaffData] = useState<Staff[]>([]);

    useEffect(() => {
        // Hàm bất đồng bộ để tải dữ liệu
        const fetchStaffData = async () => {
          try {
            const response = await fetch('/data/staff.json'); // Đường dẫn đến file JSON
            const data = await response.json();
            setStaffData(data); // Cập nhật state với dữ liệu JSON
          } catch (error) {
            console.error('Error loading staff data:', error);
          }
        };
    
        fetchStaffData(); // Gọi hàm bất đồng bộ
      }, []); // Chạy một lần khi component mount

    return (
        <div className="flex flex-col pt-[2.5%]">
            <div>
                <h1 className="text-2xl font-bold mb-4 pl-[5.5%]">Danh sách nhân viên</h1>
            </div>
            <div className="flex justify-center w-full">
                <table className="w-[90%]">
                    <thead className="table-dark">
                        <tr>
                            <th className="px-4 py-2 border-white border-8 text-center ">ID</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Họ tên</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Giới tính</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Ngày sinh</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Chức vụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffData.map((staff) => (
                            <tr key={staff.id}>
                                <td className="px-4 py-2 text-center">{staff.id}</td>
                                <td className="px-4 py-2 text-center">{staff.name}</td>
                                <td className="px-4 py-2 text-center">{staff.gender}</td>
                                <td className="px-4 py-2 text-center">{staff.birthday}</td>
                                <td className="px-4 py-2 text-center">{staff.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};
