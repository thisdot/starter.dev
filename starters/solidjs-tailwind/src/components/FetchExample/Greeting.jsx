import { createResource, Match, Switch } from 'solid-js';
import greetingFetcher from './greetingFetcher';

const Greeting = () => {
  const [message] = createResource(greetingFetcher());
  return (
    <Switch>
      <Match when={message.error}>
        <p class="text-red-500">There was an error loading your greeting :(</p>
      </Match>
      <Match when={!message.loading}>
        <p>Message: {message()}</p>
      </Match>
      <Match when={message.loading}>
        <div class="w-[80%] lg:w-[20%] mx-auto grow animate-pulse bg-gray-200 rounded-md p-3" />
      </Match>
    </Switch>
  );
};

export default Greeting;
