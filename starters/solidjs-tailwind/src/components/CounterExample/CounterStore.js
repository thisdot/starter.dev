import { createSignal } from 'solid-js';

const [count, setCount] = createSignal(0);

const increase = () => setCount(count() + 1);
const decrease = () => setCount(count() - 1);
const reset = () => setCount(0);

export { count, increase, decrease, reset };
