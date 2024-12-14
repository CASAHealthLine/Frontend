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

  const columns = [
    { column: 'id', displayColumn: 'ID' },
    { column: 'room', displayColumn: 'Tên phòng' },
    { column: 'name', displayColumn: 'Người phụ trách' },
    { column: 'address', displayColumn: 'Địa chỉ phòng khám' },
    { column: 'people', displayColumn: 'Người đợi' },
  ];

  return (
    <List
      title="Danh sách phòng khám"
      columns={columns}
      data={clinicData}
      filters={['name', 'room', 'address']}
    />
  );
};
