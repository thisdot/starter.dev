import { useLocation } from '@solidjs/router';
import greetingFetcher from './greetingFetcher';
import { createEffect, createSignal, Match, Switch } from 'solid-js';
import { createQuery } from '@tanstack/solid-query';

const Greeting = () => {
  const [message, setMessage] = createSignal<string>('');
  const location = useLocation();

  const query = createQuery(
    () => [location.query.greeting],
    () => greetingFetcher(location.query?.greeting ?? '')
  );

  createEffect(() => {
    if (query.isSuccess) {
      setMessage(query.data);
    }
  });

  return (
    <div class="w-1/2 mx-auto">
      <Switch>
        <Match when={query.isLoading}>
          <div class="grow animate-pulse rounded-md bg-gray-200 text-left">
            Loading...
          </div>
        </Match>
        <Match when={query.isError}>
          <div class="grow rounded border border-solid border-red-300 bg-red-100 p-4 text-center text-red-500">
            Error:{' '}
            <span class="text-red-500">
              There was an error loading your greeting :(
            </span>
          </div>
        </Match>
        <Match when={query.isSuccess}>
          <div class="flex w-full justify-center text-xl">
            <div class="mr-4">Message:</div>
            <div class="text-left">{message()} from This Dot Labs!</div>
          </div>
        </Match>
      </Switch>
    </div>
  );
};

export default Greeting;
