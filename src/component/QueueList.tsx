import React, { useEffect, useState } from 'react';
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
    const [searchTerm, setSearchTerm] = useState<string>(""); // Dữ liệu tìm kiếm
    const [searchField, setSearchField] = useState<string>("name"); // Trường tìm kiếm (mặc định là họ tên)
    const filteredData = queueData.filter((queue) => {
        const value = queue[searchField as keyof Queue];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
    useEffect(() => {
        // Hàm bất đồng bộ để tải dữ liệu
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

    return (
        <div className="flex flex-col pt-[2.5%]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4 pl-[5.5%]">Danh sách hàng đợi</h1>
                <div className="flex items-center gap-2 pr-[5.5%]">
                    {/* Dropdown chọn trường tìm kiếm */}
                    <select
                        className="border rounded px-2 py-1"
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                    >
                        <option value="id">Mã y lệnh</option>
                        <option value="name">Họ tên</option>
                        <option value="room">Phòng</option>
                        <option value="time">Thời gian</option>
                        <option value="status">Trạng thái</option>
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
                            <th className="px-4 py-2 border-white border-8 text-center">Mã y lệnh</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Họ tên</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Được điều đến phòng</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Thời gian</th>
                            <th className="px-4 py-2 border-white border-8 text-center">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((queue) => (
                            <tr key={queue.id}>
                                <td className="px-4 py-2 text-center">{queue.id}</td>
                                <td className="px-4 py-2 text-center">{queue.name}</td>
                                <td className="px-4 py-2 text-center">{queue.room}</td>
                                <td className="px-4 py-2 text-center">{queue.time}</td>
                                <td className="px-4 py-2 text-center">{queue.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};
