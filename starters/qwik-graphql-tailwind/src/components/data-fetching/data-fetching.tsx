import { component$, useStore, Resource, useResource$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { useStarterQuery } from '~/utils/useStarterQuery';

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
  const location = useLocation();

  const store = useStore({
    greeting: '',
  });

  const greetingResource = useResource$<HelloResponse>(({ track, cleanup }) => {
    // Use `track` to trigger re-run of the the data fetching function.
    track(() => store.greeting);
    track(() => location.query);

    // const greetingValue = store.greeting;
    const greetingValue = store.greeting || location.query.greeting;
    // The `cleanup` function will be called when the function re-runs and the `AbortController` will abort the previous request.
    const abortController = new AbortController();
    cleanup(() => abortController.abort());

    // Fetch the the greeting and return Promise that resolves to the greeting.
    return fetchGreeting(greetingValue, abortController);
  });

  return (
    <div>
      <div class="pb-8 text-center">
        <input
          type="text"
          value={store.greeting}
          placeholder="Who should the server greet?"
          onInput$={(ev) => {
            setTimeout(() => {
              store.greeting = (ev.target as HTMLInputElement).value;
            }, 1000);
          }}
          class="text-l w-96 max-w-full rounded border-0 bg-white px-4 py-4 shadow outline-none placeholder:italic focus:outline-none focus:ring"
        />
      </div>
      <div class="flex w-full justify-center text-xl">
        <Resource
          value={greetingResource}
          onPending={() => <div class="grow animate-pulse rounded-md bg-gray-200 text-left">Loading...</div>}
          onRejected={(error) => (
            <div
              class="grow rounded border border-solid border-red-300 bg-red-100 p-4 text-center text-red-500"
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
  if (!greeting) {
    greeting = '';
  }

  const resp = await useStarterQuery(GET_GREETING, { greeting }, abortController?.signal);

  return await resp.json();
}
