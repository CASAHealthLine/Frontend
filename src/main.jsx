import React from 'react';
import ReactDOM from 'react-dom/client';
import Entry from './page/Entry.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './page/Home.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Entry />
    </Router>
  </React.StrictMode>
);