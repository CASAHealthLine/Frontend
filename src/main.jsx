import React from 'react';
import ReactDOM from 'react-dom/client';
import Entry from './page/Entry.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Entry />} />
        <Route path="/register" element={<Entry />} />
        <Route path="/logout" element={<Entry />} />

        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Home />} />
        <Route path="/queue" element={<Home />} />
        <Route path="/patient" element={<Home />} />
        <Route path="/staff" element={<Home />} />
        <Route path="/statistic" element={<Home />} />
        <Route path="/rooms" element={<Home />} />
        <Route path="/test" element={<Home />} />
        <Route path="/staff" element={<Home />} />
        <Route path="/setting" element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>
);