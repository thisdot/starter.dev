import { component$ } from '@builder.io/qwik';
import { Counter } from './counter';

export default component$(() => {
  return (
    <div>
      <Counter />
    </div>
  );
});
