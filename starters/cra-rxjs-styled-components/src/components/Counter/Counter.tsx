import { useState } from 'react';
import { CounterButton } from './Counter.styles';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <CounterButton onClick={() => setCount(count + 1)} role="button">
      Count: {count}
    </CounterButton>
  );
}
