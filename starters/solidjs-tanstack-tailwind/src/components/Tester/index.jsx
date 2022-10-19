import { createSignal } from 'solid-js';

function Tester() {
  const [todos, setTodos] = createSignal([]);

  const toggleTodo = (value) => {
    let list = [];
    if (todos().includes(value)) {
      const filteredTodo = todos().filter((res) => res !== value);
      list = [...filteredTodo];
    } else {
      list = [...todos(), value];
    }
    setTodos(list);
  };
  const isChecked = (value) => todos().includes(value);

  return <input type="checkbox" checked={isChecked('check1')} onchange={[toggleTodo, 'check1']} />;
}

export default Tester;
