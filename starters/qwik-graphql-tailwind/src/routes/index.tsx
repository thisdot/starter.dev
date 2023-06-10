import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import { APP_TITLE } from '~/utils/constants';

export default component$(() => {
  return (
    <>
      <header class="mx-auto flex w-full items-center justify-center bg-blue-500 p-4 text-lg text-white lg:w-[75%]">
        Qwik, GraphQL and Tailwind CSS Starter kit
      </header>
      <div class="flex flex-col items-center gap-2 text-base text-blue-800 underline">
        <Link href="/counter-example" class="transition-colors delay-100 hover:text-blue-500">
          See Counter example component
        </Link>
        <Link href="./data-fetching" class="transition-colors delay-100 hover:text-blue-500">
          See Fetch example component
        </Link>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: APP_TITLE,
};
