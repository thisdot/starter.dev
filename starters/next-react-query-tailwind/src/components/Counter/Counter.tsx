import { useState } from 'react';

const DEFAUT_COUNT = 0;

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-evenly whitespace-nowrap">
      <h2 className="text-2xl font-bold" role="display-element">Count: { count }</h2>
      <button onClick={() => setCount(count + 1)} role="button-increment">Increment</button>
      <button onClick={() => setCount(count - 1)} role="button-decrement">Decrement</button>
      <button onClick={() => setCount(DEFAUT_COUNT)} role="button-reset">Reset</button>
    </div>
  );
}
