import { Routes, Route } from 'react-router-dom';
import { Homepage } from '@/components/Homepage';
import { Counter } from '@/components/Counter';
import { RxJSExample } from '@/components/RxJS-Example';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/button-example" element={<Counter />} />
      <Route path="/rxjs-example" element={<RxJSExample />} />
    </Routes>
  );
}
