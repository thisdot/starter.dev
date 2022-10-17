import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Counter } from './counter';

export default component$(() => {
  return (
    <div>
      <Counter />
      <Link href="/">Return Home</Link>
    </div>
  );
});
