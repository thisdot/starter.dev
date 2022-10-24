import { createResource } from 'solid-js';
import greetingFetcher from './GreetingFetcher';

const Greeting = () => {
  const [message] = createResource(greetingFetcher());
  return <p>Message: {message}</p>;
};

export default Greeting;
