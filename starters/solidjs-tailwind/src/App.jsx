import { Routes, Route } from '@solidjs/router';
import { Home, Counter, ApiExample } from './pages';

function App() {
  return (
    <div class="text-center">
      <Routes>
        <Route component={Home} path="/" />
        <Route component={Counter} path="/counter" />
        <Route component={ApiExample} path="/api-example" />
        <div className="flex justify-center">
          <a href="https://www.netlify.com">
            <img
              src="https://www.netlify.com/v3/img/components/netlify-light.svg"
              alt="Deploys by Netlify"
            />
          </a>
        </div>
      </Routes>
    </div>
  );
}

export default App;
