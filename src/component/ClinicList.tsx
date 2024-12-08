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
    const [searchTerm, setSearchTerm] = useState<string>(""); // Dữ liệu tìm kiếm
    const [searchField, setSearchField] = useState<string>("name"); // Trường tìm kiếm (mặc định là họ tên)

    const filteredData = clinicData.filter((clinic) => {
        const value = clinic[searchField as keyof Clinic];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
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
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4 pl-[5.5%]">Danh sách phòng khám</h1>
                <div className="flex items-center gap-2 pr-[5.5%]">
                    {/* Dropdown chọn trường tìm kiếm */}
                    <select
                        className="border rounded px-2 py-1"
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                    >
                        <option value="id">ID</option>
                        <option value="room">Tên phòng</option>
                        <option value="name">Người phụ trách</option>
                        <option value="address">Địa chỉ phòng khám</option>
                        <option value="people">Số người</option>
                    </select>
                    {/* Ô nhập tìm kiếm */}
                    <input
                        type="text"
                        className="border rounded px-2 py-1"
                        placeholder={`Tìm kiếm theo ${searchField}`}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-center w-full">
                <table className="w-[90%]">
                    <thead className="table-dark">
                        <tr>
                            <th className="px-4 py-2 border-white border-8 text-center">ID</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Tên phòng</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Người phụ trách</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Địa chỉ phòng khám</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Người đợi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((clinic) => (
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
