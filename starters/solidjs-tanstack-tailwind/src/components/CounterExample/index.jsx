import CounterButton from './CounterButton';
import CounterDisplay from './CounterDisplay';
import { increase, decrease, reset } from './CounterStore';

const CounterExample = () => {
  return (
    <div class="flex flex-wrap lg:flex-nowrap justify-center gap-14 items-center">
      <CounterDisplay />
      <div class="flex flex-wrap lg:flex-nowrap gap-14 justify-center">
        <CounterButton data-testid="increment" onClick={increase}>
          Increment
        </CounterButton>
        <CounterButton data-testid="decrement" onClick={decrease}>
          Decrement
        </CounterButton>
        <CounterButton data-testid="reset" onClick={reset}>
          Reset
        </CounterButton>
      </div>
    </div>
  );
};

export default CounterExample;
