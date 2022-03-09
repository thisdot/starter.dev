import { useState } from 'react';
import { Button } from './Button';
import * as styles from './Counter.classNames'


export const Counter = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count !== 0) setCount(count - 1);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.textContainer}>
          <h3 className={styles.h3Text}>Count:</h3>
          <h1 className={styles.h1Text}>{count}</h1>
        </div>
        <div>
          <Button title={"-"} action={decrementCount} />
          <Button title={"+"} action={incrementCount} />
        </div>
      </div>
    </div>
  );
}
