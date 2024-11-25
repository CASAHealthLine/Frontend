import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  PatientSlider  from '../component/Patient/PatientSlider';
import  PatientTopbar  from '../component/Patient/PatientTopbar';
import  PatientDashboard  from '../page/PatientDashboard';

function Home() {
  return (
      <div className='flex flex-row relative h-full'>
        <PatientSlider />
        <div className='flex flex-col relative w-full'>
          <PatientTopbar />
          <PatientDashboard/>
        </div>
      </div>
  );
}

export default Home;
