import { createSignal } from 'solid-js';

function Tester() {
  const [todos, setTodos] = createSignal([]);

  const toggleTodo = (value) => {
    if (todos().includes(value)) {
      const updateTodo = todos().filter((res) => res !== value);
      setTodo([...updateTodo]);
    } else if (todos().length > 0) {
      setTodos([...todos(), value]);
    } else {
      setTodos([value]);
    }
  };
  const isChecked = (value) => todos().includes(value);

  return <input type="checkbox" checked={isChecked('check1')} onchange={[toggleTodo, 'check1']} />;
}

export default Tester;
