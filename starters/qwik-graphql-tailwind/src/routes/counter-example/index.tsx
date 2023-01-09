import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Counter from '~/components/counter';

export default component$(() => {
  return (
    <div class="w-3/5 mx-auto text-center">
      <h1 class="text-[2rem] font-bold border-b-4 border-blue-600 py-4 my-5">
        Increment, Decrement and Reset Button Example
      </h1>
      <div class="py-5">
        <Counter />
      </div>
      <div className="my-2.5">
        <Link className="underline text-blue-600 hover:text-blue-800 text-xl" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
});
