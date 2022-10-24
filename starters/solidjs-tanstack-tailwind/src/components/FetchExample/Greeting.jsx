import { createResource, Match, Switch } from 'solid-js';
import greetingFetcher from './GreetingFetcher';

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
        <p>Get ready to be greeted!</p>
      </Match>
    </Switch>
  );
};

export default Greeting;
