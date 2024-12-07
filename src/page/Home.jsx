import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from '../component/Sidebar';
import { Topbar } from '../component/Topbar';
import { Queueinfo } from '../component/Queueinfo';
import { useState } from 'react';
import { StatisticsOverview } from '../component/StatisticsOverview';
import { StaffList } from '../component/StaffList';
import { PatientList } from '../component/PatientList';
import { TestList } from '../component/TestList';
import { QueueList } from '../component/QueueList';
import { ClinicList } from '../component/ClinicList';
function Home() {
  // Function to handle toggle
  const handleQueueToggle = () => {
    setShowQueueInfo((prev) => !prev);
  };

  return (
    <div className='flex flex-row relative h-full'>
      <Sidebar onQueueToggle={handleQueueToggle} />
      <div className='flex flex-col relative w-full'>
        <Topbar />
        <Routes>
          <Route path="/statistic" element={<StatisticsOverview />} />
          <Route path="/queue" element={<Queueinfo />} />
        </Routes>
        
        <TestList />
      </div>
    </div>
  );
}

export default Home;
