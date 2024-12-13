import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { AddPatientModal } from './AddPatientModal';
import '../index.css';

type Patient = {
    id: number;
    name: string;
    gender: string;
    birthday: string;
    address: string;
    bhyt: string;
    cccd: string;
    job: string;
    phone: string;
    account_id: number;
    created_at: string;
    email: string;
};

export const PatientList = () => {
    const [patientData, setPatientData] = useState<Patient[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(""); // Dữ liệu tìm kiếm
    const [searchField, setSearchField] = useState<string>("name"); // Trường tìm kiếm (mặc định là họ tên)
    const [showModal, setShowModal] = useState(false);

    const filteredData = patientData.filter((patient) => {
        const value = patient[searchField as keyof Patient];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });

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
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4 pl-[5.5%]">Danh sách bệnh nhân</h1>
                <div className="flex items-center gap-2 pr-[5.5%]">
                    <Plus className="cursor-pointer" onClick={() => setShowModal(true)} />
                    <AddPatientModal
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        patientData={patientData} // Truyền danh sách bệnh nhân hiện tại
                        onSave={(newPatient) => setPatientData([...patientData, newPatient])} // Cập nhật danh sách
                    />
                    {/* Dropdown chọn trường tìm kiếm */}
                    <select
                        className="border rounded px-2 py-1"
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                    >
                        <option value="id">ID</option>
                        <option value="name">Họ tên</option>
                        <option value="gender">Giới tính</option>
                        <option value="birthday">Ngày sinh</option>
                        <option value="cccd">CCCD</option>
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
                            <th className="px-4 py-2 border-white border-8 text-center">Họ tên</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Giới tính</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Ngày sinh</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Cccd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((patient) => (
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
