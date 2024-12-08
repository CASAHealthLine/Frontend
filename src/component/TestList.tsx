import React, { useEffect, useState } from 'react';
import '../index.css';
type Test = {
    id: number;
    name: string;
    gender: string;
    birthday: string;
    test: string;
};

export const TestList = () => {
    const [testData, setTestData] = useState<Test[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(""); // Dữ liệu tìm kiếm
    const [searchField, setSearchField] = useState<string>("name"); // Trường tìm kiếm (mặc định là họ tên)
    const filteredData = testData.filter((test) => {
        const value = test[searchField as keyof Test];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });

    useEffect(() => {
        // Hàm bất đồng bộ để tải dữ liệu
        const fetchTestData = async () => {
          try {
            const response = await fetch('/data/test_list.json'); // Đường dẫn đến file JSON
            const data = await response.json();
            setTestData(data); // Cập nhật state với dữ liệu JSON
          } catch (error) {
            console.error('Error loading test data:', error);
          }
        };
    
        fetchTestData(); // Gọi hàm bất đồng bộ
      }, []); // Chạy một lần khi component mount


    return (
        <div className="flex flex-col pt-[2.5%]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4 pl-[5.5%]">Danh sách xét nghiệm</h1>
                <div className="flex items-center gap-2 pr-[5.5%]">
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
                        <option value="test">Xét nghiệm</option>
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
                            <th className="px-4 py-2 border-white border-8 text-center">Xét nghiệm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((test) => (
                            <tr key={test.id}>
                                <td className="px-4 py-2 text-center">{test.id}</td>
                                <td className="px-4 py-2 text-center">{test.name}</td>
                                <td className="px-4 py-2 text-center">{test.gender}</td>
                                <td className="px-4 py-2 text-center">{test.birthday}</td>
                                <td className="px-4 py-2 text-center">{test.test}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};
