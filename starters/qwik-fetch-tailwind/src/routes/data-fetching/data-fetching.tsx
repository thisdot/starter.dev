import { component$, useStore, Resource, useResource$ } from '@builder.io/qwik';
import * as styles from './data-fetching.classNames';

export const DataFetching = component$(() => {
  const store = useStore({
    greeting: '',
  });

  const greetingResource = useResource$<string>(({ track, cleanup }) => {
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
          onResolved={(message) => <strong>{message}.</strong>}
        />
      </div>
    </div>
  );
});

export async function fetchGreeting(greeting: string, abortController?: AbortController): Promise<string> {
  const resp = await fetch(`https://api.starter.dev/hello?greeting=${greeting}`, {
    signal: abortController?.signal,
  });
  return await resp.text();
}
