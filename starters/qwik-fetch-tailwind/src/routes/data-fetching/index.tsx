import { component$, useStore, Resource, useResource$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { DataFetching } from './data-fetching';

export default component$(() => {
  return (
    <div>
      <DataFetching />
      <Link href="/">Return Home</Link>
    </div>
  );
});
