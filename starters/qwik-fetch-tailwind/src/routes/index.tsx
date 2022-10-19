import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <h1>
        Welcome to Qwik <span class="lightning">⚡️</span> starter kit
      </h1>

      <ul>
        <li>
          Check out the <Link href="/counter">Counter button example component</Link>
        </li>
        <li>
          Check out the <Link href="./data-fetching">Data fetching example</Link>
        </li>
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik Starter Kit',
};
