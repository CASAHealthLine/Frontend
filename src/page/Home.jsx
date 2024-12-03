import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from '../component/Sidebar';
import { Topbar } from '../component/Topbar';
import { Queueinfo } from '../component/Queueinfo';
import { useState } from 'react';
import { StatisticsOverview } from '../component/StatisticsOverview';
function Home() {
  // State to toggle the visibility of Queueinfo
  const [showQueueInfo, setShowQueueInfo] = useState(false);

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
          {/* Add your routes here */}
        </Routes>
        <StatisticsOverview />
      </div>
    </div>
  );
}

export default Home;
