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

  const columns = ['id', 'name', 'room', 'time', 'status']; // Các tên cột thực tế
  const displayColumns = ['Mã y lệnh', 'Họ tên', 'Phòng', 'Thời gian', 'Trạng thái']; // Tên hiển thị tương ứng
  

  return (
    <List
      title="Danh sách hàng đợi"
      columns={columns} // Truyền mảng tên cột thực tế
      displayColumns={displayColumns} // Truyền mảng tên hiển thị
      data={queueData}
      filters={['name', 'room', 'status']}
    />
  );
};
