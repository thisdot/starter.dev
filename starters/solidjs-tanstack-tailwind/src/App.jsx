import { Routes, Route } from '@solidjs/router';
import { Home, Counter, ApiExample } from './pages';

function App() {
  return (
    <div class="text-center">
      <Routes>
        <Route component={Home} path="/" />
        <Route component={Counter} path="/counter" />
        <Route component={ApiExample} path="/api-example" />
      </Routes>
    </div>
  );
}

export default App;
