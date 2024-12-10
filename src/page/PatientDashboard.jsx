import React, { useState } from 'react';
import PatientSlider from '../component/Patient/PatientSlider';  
import { Topbar } from '../component/Topbar';
import PatientHome from '../component/Patient/PatientHome';
import PatientInfo from '../component/Patient/PatientInfo';

const PatientDashboard = () => {
  // Track the active section state
  const [activeSection, setActiveSection] = useState('home'); // Default to "home"

  // Render the content dynamically based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <PatientHome />;
      case 'personalInfo':
        return <PatientInfo />;
      // Add more sections if needed
      default:
        return <PatientHome />; // Default section
    }
  };

  return (
    <div className='flex flex-row relative h-full'>
      {/* Pass activeSection and setActiveSection to PatientSlider */}
      <PatientSlider setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className='flex flex-col relative w-full'>
        <Topbar />
        {renderContent()} {/* Dynamically renders content based on active section */}
      </div>
    </div>
  );
};

export default PatientDashboard;
