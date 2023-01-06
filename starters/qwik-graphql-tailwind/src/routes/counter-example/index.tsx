import { component$ } from '@builder.io/qwik';
import Counter from '~/components/counter';

export default component$(() => {
  return (
    <div className="w-3/5 mx-auto text-center">
      <h1 className="text-[2rem] font-bold border-b-4 border-blue-600 py-4 my-5">
        Increment, Decrement and Reset Button Example
      </h1>
      <div className="py-5">
        <Counter />
      </div>
    </div>
  );
});
