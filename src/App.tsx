import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from './component/Sidebar';
import { Topbar } from './component/Topbar';
import { SidebarProvider } from './contexts/SidebarProvider';
import { useAuthValidation } from './hooks/useAuthValidation';
import { useSelector } from 'react-redux';
import PatientHome from './component/Patient/PatientHome';
import PatientInfo from './component/Patient/PatientInfo';
import QueueList from './component/QueueList';
import { ThemeProvider } from '@mui/material';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import React from 'react';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#24c38c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#61b0ff',
      contrastText: '#ffffff',
    },
  },
};

const theme = createTheme(themeOptions);

function App() {
  useAuthValidation();
  const user = useSelector((state: { user: { role: string } }) => state.user);
  if (!user) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <SidebarProvider>
        <div className='flex flex-row relative h-screen'>
          <Sidebar />
          <div className='flex flex-col relative w-full h-screen'>
            <Topbar />
            <div className='h-full overflow-y-auto'>
              <Routes>
                <Route path='/' element={user.role === 'patient' ? <PatientHome /> : <QueueList />} />
                <Route path='/profile' element={<PatientInfo />} />
              </Routes>
            </div>
          </div>
          
        </div>
        
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
