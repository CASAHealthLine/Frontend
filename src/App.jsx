import { BrowserRouter } from 'react-router-dom';
import { Header } from './component/Header';

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-row relative h-full'>
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
