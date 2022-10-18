import { component$, useStore } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
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
      <Link href="/">Return Home</Link>
    </div>
  );
});

export const Display = component$((props: { store: { count: number } }) => {
  return <div>Count: {props.store.count}</div>;
});
