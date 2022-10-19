import { Routes, Route } from 'solid-app-router';
import styles from './App.module.css';
import { Home, Counter } from './pages';


function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        Creat SolidJs, Tanstack and Tailwind Starter kit
      </header>

      <Routes>
        <Route element={Home} path='/' />
        <Route element={Counter} path='/counter' />
      </Routes>
    </div>
  );
}

export default App;
