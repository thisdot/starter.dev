import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Homepage } from './components/Homepage';
import { Counter } from './components/Counter';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/button-example" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  );
}
