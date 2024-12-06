import React from 'react';
import ReactDOM from 'react-dom/client';
import Entry from './page/Entry.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Entry />} />
        <Route path="/register" element={<Entry />} />
        <Route path="/logout" element={<Entry />} />

        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);