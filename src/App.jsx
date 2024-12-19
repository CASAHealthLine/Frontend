import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from './component/Sidebar';
import { Topbar } from './component/Topbar';
import { StaffList } from './page/StaffList';
import { Queueinfo } from './component/Queueinfo';
import { PatientList } from './page/PatientList';
import { PatientInformation } from './page/PatientInformation';

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-row relative h-full'>
        <Sidebar />
        <div className='flex flex-col relative w-full'>
          <Topbar />
          <Routes>
          </Routes>
          <PatientInformation/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
