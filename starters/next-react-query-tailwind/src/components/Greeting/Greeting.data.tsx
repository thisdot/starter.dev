import { useQuery } from 'react-query';
import { GreetingView } from './Greeting.view';

export function Greeting() {
  const {
    data: message,
    isLoading,
    error,
  } = useQuery<string>('hello', async () => {
    const response = await fetch('https://api.starter.dev/hello?greeting=from This Dot Labs!');
    return await response.text();
  });

  const displayMessage = error ? null : message;

  return (
    <GreetingView message={displayMessage} loading={isLoading} />
  );
}