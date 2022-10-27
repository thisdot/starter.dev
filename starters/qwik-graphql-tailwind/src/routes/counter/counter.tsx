import { component$, $, useStore } from '@builder.io/qwik';
import { Button } from '../../components/button/button';
import * as styles from './counter.classNames';

export const Counter = component$(() => {
  const store = useStore({
    count: 0,
  });

  const increment$ = $(() => {
    store.count++;
  });

  const decrement$ = $(() => {
    store.count--;
  });

  const reset$ = $(() => {
    store.count = 0;
  });

  return (
    <div className={styles.container}>
      <Display store={store} />
      <div className={styles.buttonsContainer}>
        <div className={styles.button}>
          <Button title="-" action$={decrement$} />
        </div>
        <div className={styles.button}>
          <Button title="+" action$={increment$} />
        </div>
        <div className={styles.button}>
          <Button title="&times;" action$={reset$} />
        </div>
      </div>
    </div>
  );
});

export const Display = component$((props: { store: { count: number } }) => {
  return (
    <div className={styles.textContainer}>
      <p className={styles.h3Text}>Count:</p> <h1 className={styles.h1Text}>{props.store.count}</h1>
    </div>
  );
});
