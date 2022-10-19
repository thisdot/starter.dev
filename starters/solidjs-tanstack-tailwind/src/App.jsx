import { Routes, Route } from '@solidjs/router';
import { Home, Counter, ApiExample } from './pages';

function App() {
  return (
    <div class="text-center">
      <header class="flex justify-center items-center text-white my-5 mx-auto bg-blue-500  w-full lg:w-[75%] p-4 text-lg ">
        SolidJs, Tanstack and Tailwind Starter kit
      </header>

      <Routes>
        <Route element={Home} path="/" />
        <Route element={Counter} path="/counter" />
        <Route element={ApiExample} path="/api-example" />
      </Routes>
    </div>
  );
}

export default App;
