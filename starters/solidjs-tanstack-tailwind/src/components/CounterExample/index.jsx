import { createSignal } from 'solid-js';
import CounterButton from './CounterButton';
import CounterDisplay from './CounterDisplay';
const [count, setCount] = createSignal(0);

const CounterExample = () => {
  const increase = () => setCount(count() + 1);
  const decrease = () => setCount(count() > 0 ? count() - 1 : 0);
  const reset = () => setCount(0);

  return (
    <div class="flex flex-wrap lg:flex-nowrap justify-center gap-14 items-center">
      <CounterDisplay />
      <div class="flex flex-wrap lg:flex-nowrap gap-14 justify-center">
        <CounterButton onClick={increase}>Increment</CounterButton>
        <CounterButton onClick={decrease}>Decrement</CounterButton>
        <CounterButton onClick={reset}>Reset</CounterButton>
      </div>
    </div>
  );
};

export { count };

export default CounterExample;
