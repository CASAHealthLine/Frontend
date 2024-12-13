import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from './component/Sidebar';
import { Topbar } from './component/Topbar';
import { SidebarProvider } from './contexts/SidebarProvider';
import { useAuthValidation } from './hooks/useAuthValidation';
import { PatientList } from './component/PatientList';
function App() {
  useAuthValidation();

  return (
    <SidebarProvider>
      <div className='flex flex-row relative h-full'>
        <Sidebar />
        <div className='flex flex-col relative w-full'>
          <Topbar />
          <Routes>
          </Routes>
          <PatientList/>
        </div>
        
      </div>
      
    </SidebarProvider>
  );
}

export default App;
