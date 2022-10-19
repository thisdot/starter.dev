import logo from './logo.svg';
import styles from './App.module.css';

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p class="text-base">
          Edit <code class="text-blue-300">src/App.jsx</code> and save to
          reload.
        </p>
        <a
          classList={{ [styles.link]: true, 'text-base': true }}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
}

export default App;
