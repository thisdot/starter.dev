import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <div class="flex flex-wrap lg:flex-nowrap justify-center gap-14 items-center">
      <strong role="display-count" class="text-xl">
        Count: {count()}
      </strong>
    <button
    type="button"
    class="bg-blue-500 text-white text-base font-medium px-4 py-2 rounded-md outline-none"
    onClick={() => setCount(count() + 1)}>
      Increment
    </button>
    <button
    type="button"
    class="bg-blue-500 text-white text-base font-medium px-4 py-2 rounded-md outline-none"
    onClick={() => setCount(count() - 1)}>
      Decrement
    </button>
    <button
    type="button"
    class="bg-blue-500 text-white text-base font-medium px-4 py-2 rounded-md outline-none"
    onClick={() => setCount(0)}>
      Reset
    </button>
    </div>
  );
}
