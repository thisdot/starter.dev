import { component$, useStore, Resource, useResource$ } from '@builder.io/qwik';
import { useQuery } from '../../utils/useQuery';
import * as styles from './data-fetching.classNames';

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
    greeting: '',
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
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={store.greeting}
          placeholder="Who should the server greet?"
          onInput$={(ev) => (store.greeting = (ev.target as HTMLInputElement).value)}
          className={styles.input}
        />
      </div>
      <div className={styles.textContainer}>
        <Resource
          value={greetingResource}
          onPending={() => <>Loading...</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={({ data }) => <strong>{data.hello}.</strong>}
        />
      </div>
    </div>
  );
});

export async function fetchGreeting(greeting: string, abortController?: AbortController): Promise<HelloResponse> {
  if (!greeting) {
    greeting = 'there';
  }

  const { executeQuery$ } = useQuery(GET_GREETING);

  const resp = await executeQuery$({
    signal: abortController?.signal,
    url: 'https://api.starter.dev/graphql',
    variables: {
      greeting,
    },
  });

  return await resp.json();
}
