import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from './component/Sidebar';
import { Topbar } from './component/Topbar';
import { SidebarProvider } from './contexts/SidebarProvider';

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className='flex flex-row relative h-full'>
          <Sidebar />
          <div className='flex flex-col relative w-full'>
            <Topbar />
            <Routes>
            </Routes>
          </div>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
