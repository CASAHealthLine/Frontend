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
  const columns = ['id', 'name', 'gender', 'birthday', 'test']; // Các tên cột thực tế
  const displayColumns = ['ID', 'Họ tên', 'Giới tính', 'Giới tính', 'Xét nghiệm']; // Tên hiển thị tương ứng
  

  return (
    <List
      title="Danh sách xét nghiệm"
      columns={columns} // Truyền mảng tên cột thực tế
      displayColumns={displayColumns} // Truyền mảng tên hiển thị
      data={testData}
      filters={['name', 'gender', 'birthday', 'test']}
    />
  );
};
