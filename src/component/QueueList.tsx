import React, { useEffect, useState } from 'react';
import { ApiList } from './ApiList';
import '../index.css';
import { AddPatientModal } from './AddPatientModal';

type Queue = {
  id: number;
  name: string;
  room: string;
  time: string;
  status: string;
};

export const QueueList = () => {
  const [queueData, setQueueData] = useState<Queue[]>([]);

  const columns = ['patient_id', 'patient_name', 'gender', 'birth_date', 'cccd', 'status']; // Tên cột thực tế tương ứng
  const displayColumns = ['ID', 'Họ tên', 'Giới tính', 'Ngày sinh', 'CCCD', 'Trạng thái']; // Tên hiển thị tương ứng

  const [showAddPatientModal, setShowAddPatientModal] = useState(false);

  return (
    <>
      <ApiList
        title="Danh sách hàng đợi"
        columns={columns} // Truyền mảng tên cột thực tế
        displayColumns={displayColumns} // Truyền mảng tên hiển thị
        apiEndpoint='queue/'
        showPlusButton={true}
        showTrashButton={true}
        onPlusClick={() => setShowAddPatientModal(true)}
      />
      <AddPatientModal
        show={showAddPatientModal}
        onClose={() => setShowAddPatientModal(false)}
      />
    </>
  );
};

export default QueueList;