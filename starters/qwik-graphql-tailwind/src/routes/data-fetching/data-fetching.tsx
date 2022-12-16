import { component$, Resource, useResource$ } from '@builder.io/qwik';
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
  const greetingResource = useResource$<HelloResponse>(({ cleanup }) => {
    // The `cleanup` function will be called when the function re-runs and the `AbortController` will abort the previous request.
    const abortController = new AbortController();
    cleanup(() => abortController.abort());

    // Fetch the the greeting and return Promise that resolves to the greeting.
    return fetchGreeting('from This Dot Labs!', abortController);
  });

  return (
    <div>
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
