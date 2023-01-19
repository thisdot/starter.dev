import { createEffect, createResource, createSignal } from 'solid-js';
import greetingFetcher from './greetingFetcher';

const Greeting = () => {
  const [greeting, setGreeting] = createSignal('');
  const [message, setMessage] = createSignal('');

  const greetingValue = greeting

  const [resp] = createResource(
    greetingValue,
     () => greetingFetcher(greetingValue())
  );

  createEffect(() => {
    if (resp() && !resp.loading) {
      setMessage(resp());
    }
  });

  return (
    <div class="w-1/4 mx-auto">
      <div class="pb-8 text-center">
        <input
          type="text"
          value={greeting()}
          placeholder="Who should the server greet?"
          onChange={(ev) => setGreeting(ev.target.value)}
          class="text-l w-96 max-w-full rounded border-0 bg-white px-4 py-4 shadow outline-none placeholder:italic focus:outline-none focus:ring"
        />
      </div>
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
                {message()} from This Dot Labs!
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Greeting;
