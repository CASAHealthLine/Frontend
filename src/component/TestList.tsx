import React, { useEffect, useState } from 'react';
import { List } from './List';
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

  useEffect(() => {
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

  const columns = [
    { column: 'id', displayColumn: 'ID' },
    { column: 'name', displayColumn: 'Họ tên' },
    { column: 'gender', displayColumn: 'Giới tính' },
    { column: 'birthday', displayColumn: 'Ngày sinh' },
    { column: 'test', displayColumn: 'Xét nghiệm' },
  ];

  return (
    <List
      title="Danh sách xét nghiệm"
      columns={columns}
      data={testData}
      filters={['name', 'gender', 'birthday', 'test']}
    />
  );
};
