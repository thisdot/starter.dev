import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import { APP_TITLE } from '../utils/constants';

export default component$(() => {
  return (
    <>
      <header class="flex justify-center items-center text-white mx-auto bg-blue-500 w-full lg:w-[75%] p-4 text-lg">
        Qwik, GraphQL and Tailwind CSS Starter kit
      </header>
      <div class="flex flex-col gap-2 items-center text-blue-800 underline text-base">
        <Link href="/counter-example" class="hover:text-blue-500 transition-colors delay-100">
          See Counter example component
        </Link>
        <Link href="./data-fetching" class="hover:text-blue-500 transition-colors delay-100">
          See Fetch example component
        </Link>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: APP_TITLE,
};
