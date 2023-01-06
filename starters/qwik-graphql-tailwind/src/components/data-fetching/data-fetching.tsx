import { component$, useStore, Resource, useResource$ } from '@builder.io/qwik';
import { useQuery } from '../../utils/useQuery';

export const GET_GREETING = `
  query HelloQuery($greeting: String!) {
    hello(greeting: $greeting)
  }
`;

interface HelloResponse {
  data: {
    hello: string;
  };
}

export const DataFetching = component$(() => {
  const store = useStore({
    greeting: 'there',
  });

  const greetingResource = useResource$<HelloResponse>(({ track, cleanup }) => {
    // Use `track` to trigger re-run of the the data fetching function.
    track(() => store.greeting);
    // The `cleanup` function will be called when the function re-runs and the `AbortController` will abort the previous request.
    const abortController = new AbortController();
    cleanup(() => abortController.abort());

    // Fetch the the greeting and return Promise that resolves to the greeting.
    return fetchGreeting(store.greeting, abortController);
  });

  return (
    <div>
      <div class="text-center pb-8">
        <input
          type="text"
          value={store.greeting}
          placeholder="Who should the server greet?"
          onInput$={(ev) => {
            setTimeout(() => {
              store.greeting = (ev.target as HTMLInputElement).value;
            }, 1000);
          }}
          class="px-4 py-4 bg-white rounded border-0 shadow outline-none focus:outline-none focus:ring w-96 max-w-full placeholder:italic text-l"
        />
      </div>
      <div class="flex w-full text-xl justify-center">
        <Resource
          value={greetingResource}
          onPending={() => <div class="text-left grow animate-pulse bg-gray-200 rounded-md">Loading...</div>}
          onRejected={(error) => (
            <div
              class="grow border border-solid border-red-300 rounded bg-red-100 p-4 text-center text-red-500"
              role="error-message"
            >
              Error: {error.message}
            </div>
          )}
          onResolved={({ data }) => (
            <>
              <div class="mr-4">Message:</div>
              <div class="text-left" role="display-message">
                {data.hello} from This Dot Labs!
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
});

export async function fetchGreeting(greeting: string, abortController?: AbortController): Promise<HelloResponse> {
  const { executeQuery$ } = useQuery(GET_GREETING);

  if (!greeting) {
    greeting = 'there';
  }

  const resp = await executeQuery$({
    signal: abortController?.signal,
    url: 'https://api.starter.dev/.netlify/functions/graphql',
    variables: {
      greeting,
    },
  });

  return await resp.json();
}
