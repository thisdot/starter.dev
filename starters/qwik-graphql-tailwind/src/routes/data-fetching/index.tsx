import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { DataFetching } from './data-fetching';

export default component$(() => {
  return (
    <div className="w-2/5 my-5 mx-auto text-center">
      <h1 className="text-[2rem] font-bold border-b-4 border-blue-600 py-4 my-5">
        Qwik + GraphQL Fetch Data using API route
      </h1>
      <DataFetching />
      <div className="my-2.5">
        <Link className="underline text-blue-600 hover:text-blue-800 text-xl" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
});
