import { useState } from 'react';
import styles from './Counter.module.css';

const DEFAUT_COUNT = 0;

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-evenly whitespace-nowrap">
      <h2 className="text-2xl font-bold" role="display-element">Count: { count }</h2>
      <button onClick={() => setCount(count + 1)} role="button-increment" className={styles.button}>Increment</button>
      <button onClick={() => setCount(count - 1)} role="button-decrement" className={styles.button}>Decrement</button>
      <button onClick={() => setCount(DEFAUT_COUNT)} role="button-reset" className={styles.button}>Reset</button>
    </div>
  );
}
