import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { DocumentHead } from '@builder.io/qwik-city';
import { APP_TITLE } from '~/utils/constants';
import { DataFetching } from '~/components/data-fetching';

export default component$(() => {
  return (
    <div class="mx-auto w-2/5 text-center">
      <h1 class="my-5 border-b-4 border-blue-600 py-4 text-[2rem] font-bold">
        Qwik + GraphQL Fetch Data using API route
      </h1>
      <DataFetching />
      <div class="my-2.5">
        <Link class="text-xl text-blue-600 underline hover:text-blue-800" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: `Data Fetching | ${APP_TITLE}`,
};
