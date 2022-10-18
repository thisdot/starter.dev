import { Routes, Route, NavLink } from 'solid-app-router';
import logo from './logo.svg';
import styles from './App.module.css';
import { Home, Counter } from './pages';


function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a class={styles.link} href="https://github.com/solidjs/solid" target="_blank" rel="noopener noreferrer">
          Learn Solid
        </a>
        <NavLink href='/counter'>Counter</NavLink>
        <NavLink href='/'>Home</NavLink>
      </header>

      <Routes>
        <Route element={Home} path='/' />
        <Route element={Counter} path='/counter' />
      </Routes>
    </div>
  );
}

export default App;
