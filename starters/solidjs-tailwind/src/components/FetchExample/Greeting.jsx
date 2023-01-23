import { createResource } from 'solid-js';
import { useLocation } from '@solidjs/router';
import greetingFetcher from './greetingFetcher';

const Greeting = () => {
  const location = useLocation();

  const [resp] = createResource(
    () => greetingFetcher(location.query?.greeting ?? '')
  );

  return (
    <div class="w-1/4 mx-auto">
      {resp.error ? (
        <div
          class="grow rounded border border-solid border-red-300 bg-red-100 p-4 text-center text-red-500"
          role="error-message"
        >
          Error:{' '}
          <span class="text-red-500">
            There was an error loading your greeting :(
          </span>
        </div>
      ) : (
        <div class="flex w-full justify-center text-xl">
          {resp.loading ? (
            <div class="grow animate-pulse rounded-md bg-gray-200 text-left">
              Loading...
            </div>
          ) : (
            <>
              <div class="mr-4">Message:</div>
              <div class="text-left" role="display-message">
                {resp()} from This Dot Labs!
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Greeting;
