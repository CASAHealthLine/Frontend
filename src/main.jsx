import React from 'react';
import ReactDOM from 'react-dom/client';
import Entry from './page/Entry.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import store from './store';
import './index.css';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Entry />} />
          <Route path="/register" element={<Entry />} />

          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);