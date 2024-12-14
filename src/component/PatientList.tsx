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

  const columns = [
    { column: 'id', displayColumn: 'ID' },
    { column: 'name', displayColumn: 'Họ tên' },
    { column: 'gender', displayColumn: 'Giới tính' },
    { column: 'birthday', displayColumn: 'Ngày sinh' },
    { column: 'cccd', displayColumn: 'CCCD' },
  ];

  return (
    <div className="flex flex-col pt-[2.5%]">
      <List
        title="Danh sách bệnh nhân"
        columns={columns}
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
