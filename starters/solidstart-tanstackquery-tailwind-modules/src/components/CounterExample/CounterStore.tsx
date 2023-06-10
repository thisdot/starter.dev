import { createSignal } from 'solid-js';
import { CounterData } from './types';

const [count, setCount] = createSignal<number>(0);

const increase = () => setCount(count() + 1);
const decrease = () => setCount(count() - 1);
const reset = () => setCount(0);

const counterData: CounterData = {
  count: count,
  actionButtons: [
    {
      label: 'Increment',
      action: increase,
    },
    {
      label: 'Decrement',
      action: decrease,
    },
    {
      label: 'Reset',
      action: reset,
    },
  ],
};

export { counterData };
