import { component$, useStore } from '@builder.io/qwik';

export const Counter = component$(() => {
  const store = useStore({
    count: 0,
  });

  return (
    <div>
      <h1>Increment, Decrement and Reset Button Examples</h1>
      <Display store={store} />
      <button onClick$={() => store.count++}>Increment</button>
      <button onClick$={() => store.count--}>Decrement</button>
      <button onClick$={() => (store.count = 0)}>Reset</button>
    </div>
  );
});

export const Display = component$((props: { store: { count: number } }) => {
  return <div>Count: {props.store.count}</div>;
});
