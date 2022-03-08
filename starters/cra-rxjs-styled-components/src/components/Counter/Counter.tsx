import { useState } from 'react';
import {
  CounterButton,
  Header,
  CounterContainer,
  CounterButtonContainer,
  CurrentCountText,
} from './Counter.styles';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <CounterContainer>
      <Header>Increment, Decrement and Reset Button Example</Header>

      <CounterButtonContainer>
        <CurrentCountText>Count:{count}</CurrentCountText>
        <CounterButton onClick={() => setCount(count + 1)}>
          Increment
        </CounterButton>
        <CounterButton onClick={() => setCount(count - 1)}>
          Decrement
        </CounterButton>
        <CounterButton onClick={() => setCount(0)}>Reset</CounterButton>
      </CounterButtonContainer>
    </CounterContainer>
  );
}
