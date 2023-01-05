import { component$, Resource, useResource$ } from '@builder.io/qwik';

interface HelloResponse {
  hello: string;
}

export const DataFetching = component$(() => {
  const greetingResource = useResource$<HelloResponse>(({ cleanup }) => {
    // The `cleanup` function will be called when the function re-runs and the `AbortController` will abort the previous request.
    const abortController = new AbortController();
    cleanup(() => abortController.abort());

    // Fetch the the greeting and return Promise that resolves to the greeting.
    return fetchGreeting('from This Dot Labs!', abortController);
  });

  return (
    <div className="flex w-full text-xl justify-center">
      <Resource
        value={greetingResource}
        onPending={() => <div className="text-left grow animate-pulse bg-gray-200 rounded-md">Loading...</div>}
        onRejected={(error) => (
          <div
            className="grow border border-solid border-red-300 rounded bg-red-100 p-4 text-center text-red-500"
            role="error-message"
          >
            Error: {error.message}
          </div>
        )}
        onResolved={({ hello }) => (
          <>
            <div className="mr-4">Message:</div>
            <div className="text-left" role="display-message">
              {hello}
            </div>
          </>
        )}
      />
    </div>
  );
});

export async function fetchGreeting(greeting: string, abortController?: AbortController): Promise<HelloResponse> {
  const encodedMessage = encodeURIComponent(greeting);
  const endpoint = `https://api.starter.dev/.netlify/functions/server/hello?greeting=${encodedMessage}`;

  const resp = await fetch(endpoint, { signal: abortController?.signal });

  return { hello: await resp.text() };
}
