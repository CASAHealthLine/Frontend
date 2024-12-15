import React, { useEffect, useState } from 'react';
import { List } from './List';
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
        console.error('Error loading clinic data:', error);
      }
    };

    fetchClinicData(); // Gọi hàm bất đồng bộ
  }, []); // Chạy một lần khi component mount

  const columns = ['id', 'room', 'name', 'address', 'people'];
  const displayColumns = ['ID', 'Tên phòng', 'Người phụ trách', 'Địa chỉ phòng khám', 'Người đợi'];
  

  return (
    <List
      title="Danh sách phòng khám"
      columns={columns} // Truyền mảng tên cột thực tế
      displayColumns={displayColumns} // Truyền mảng tên hiển thị
      data={clinicData}
      filters={['name', 'room', 'address']}
    />
  );
};
