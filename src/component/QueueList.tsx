import React, { useEffect, useState } from 'react';
import { List } from './List';
import '../index.css';

type Queue = {
  id: number;
  name: string;
  room: string;
  time: string;
  status: string;
};

export const QueueList = () => {
  const [queueData, setQueueData] = useState<Queue[]>([]);

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const response = await fetch('/data/queue_list.json'); // Đường dẫn đến file JSON
        const data = await response.json();
        setQueueData(data); // Cập nhật state với dữ liệu JSON
      } catch (error) {
        console.error('Error loading queue data:', error);
      }
    };

    fetchQueueData(); // Gọi hàm bất đồng bộ
  }, []); // Chạy một lần khi component mount

  const columns = [
    { column: 'id', displayColumn: 'Mã y lệnh' },
    { column: 'name', displayColumn: 'Họ tên' },
    { column: 'room', displayColumn: 'Phòng' },
    { column: 'time', displayColumn: 'Thời gian' },
    { column: 'status', displayColumn: 'Trạng thái' },
  ];

  return (
    <List
      title="Danh sách hàng đợi"
      columns={columns}
      data={queueData}
      filters={['name', 'room', 'status']}
    />
  );
};
