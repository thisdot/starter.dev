import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Counter from '~/components/counter';

export default component$(() => {
  return (
    <div class="mx-auto w-3/5 text-center">
      <h1 class="my-5 border-b-4 border-blue-600 py-4 text-[2rem] font-bold">
        Increment, Decrement and Reset Button Example
      </h1>
      <div class="py-5">
        <Counter />
      </div>
      <div className="my-2.5">
        <Link className="text-xl text-blue-600 underline hover:text-blue-800" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
});
