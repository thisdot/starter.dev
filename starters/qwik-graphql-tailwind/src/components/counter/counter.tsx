import { component$, $, useStore } from '@builder.io/qwik';
import { Button } from '~/components/button';

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
    <div class="flex justify-evenly whitespace-nowrap">
      <Display store={store} />
      <Button title="Increment" action$={increment$} />
      <Button title="Decrement" action$={decrement$} />
      <Button title="Reset" action$={reset$} />
    </div>
  );
});

export const Display = component$((props: { store: { count: number } }) => {
  return (
    <h2 class="text-2xl font-bold" role="display-element">
      Count: {props.store.count}
    </h2>
  );
});
