import { BrowserRouter, Routes } from 'react-router-dom';
import { Sidebar } from './component/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
