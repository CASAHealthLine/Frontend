// Updated PatientList.tsx
import React, { useEffect, useState } from 'react';
import { AddPatientModal } from './AddPatientModal';
import { List } from './List';
import '../index.css';

type Patient = {
  id: number;
  name: string;
  gender: string;
  birthday: string;
  address: string;
  bhyt: string;
  cccd: string;
  job: string;
  phone: string;
  account_id: number;
  created_at: string;
  email: string;
};

export const PatientList = () => {
  const [patientData, setPatientData] = useState<Patient[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch('/data/patient.json');
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error('Error loading Patient data:', error);
      }
    };

    fetchPatientData();
  }, []);

const columns = ["id", "name", "gender", "cccd", "birthday"]; // Các tên cột thực tế
const displayColumns = ["ID", "Họ tên", "Giới tính", "CCCD", "Ngày sinh"]; // Tên hiển thị


  return (
    <div className="flex flex-col pt-[2.5%]">
      <List
        title="Danh sách bệnh nhân"
        columns={columns} // Truyền mảng tên cột thực tế
        displayColumns={displayColumns} // Truyền mảng tên hiển thị
        data={patientData}
        filters={['name', 'gender', 'cccd']}
        showPlusButton
        onPlusClick={() => setShowModal(true)}
      />
      <AddPatientModal
        show={showModal}
        onClose={() => setShowModal(false)}
        patientData={patientData}
        onSave={(newPatient) => setPatientData([...patientData, newPatient])}
      />
    </div>
  );
};
