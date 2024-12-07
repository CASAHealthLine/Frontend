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
    const [filteredData, setFilteredData] = useState<Test[]>([]); // Dữ liệu sau khi tìm kiếm
    const [searchTerm, setSearchTerm] = useState(''); // Giá trị tìm kiếm

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
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold mb-4 pl-[5.5%]">Danh sách xét nghiệm</h1>
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
                        {testData.map((test) => (
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
