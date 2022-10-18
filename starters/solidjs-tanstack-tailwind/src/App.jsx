import logo from './logo.svg';
import styles from './App.module.css';
import { createSignal } from 'solid-js';

function App() {
  const [todos, setTodos] = createSignal([]);

  const toggleTodo = (value) => {
    if(todos().includes(value)) {
      const updateTodo = todos().filter(res => res !== value);
      setTodo([...updateTodo])
    } else if(todos().length > 0){
      setTodos([...todos(), value])
    } else {
      setTodos([value])
    }
  }
  const isChecked = (value) => todos().includes(value);
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a class={styles.link} href="https://github.com/solidjs/solid" target="_blank" rel="noopener noreferrer" data-testid="learn-solidjs">
          Learn Solid
        </a>
      </header>
      <input type="checkbox" checked={isChecked('check1')} onchange={[toggleTodo, 'check1']} />
    </div>
  );
}

export default App;
