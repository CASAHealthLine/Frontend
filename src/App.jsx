import { BrowserRouter } from 'react-router-dom';
import { Banner } from './component/Banner';

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-row relative h-full'>
        <Banner />
      </div>
    </BrowserRouter>
  );
}

export default App;
