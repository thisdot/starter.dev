import { Routes, Route } from 'react-router-dom';
import { Homepage } from '@/components/Homepage';
import { Counter } from '@/components/Counter';
import { FetchExample } from '@/components/FetchExample';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/button-example" element={<Counter />} />
      <Route path="/rxjs-example" element={<FetchExample />} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <a href="https://www.netlify.com">
          {' '}
          <img
            src="https://www.netlify.com/v3/img/components/netlify-light.svg"
            alt="Deploys by Netlify"
          />{' '}
        </a>
      </div>
    </Routes>
  );
}
