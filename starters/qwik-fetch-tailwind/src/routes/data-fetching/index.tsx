import { component$, useStore, Resource, useResource$ } from '@builder.io/qwik';

export default component$(() => {
  const store = useStore({
    greeting: 'Qwik starter kit',
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
      <span>
        My message:
        <input value={store.greeting} onInput$={(ev) => (store.greeting = (ev.target as HTMLInputElement).value)} />
      </span>
      <div>
        <Resource
          value={greetingResource}
          onPending={() => <>Loading...</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(message) => <strong>{message}</strong>}
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
