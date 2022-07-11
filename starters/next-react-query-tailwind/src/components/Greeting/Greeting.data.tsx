import { useQuery } from 'react-query';
import { GreetingView } from './Greeting.view';

export function Greeting() {
  const {
    data: message,
    isLoading,
    error,
  } = useQuery<string>('hello', async () => {
    return await fetch('https://api.starter.dev/hello?greeting=from This Dot Labs!').then((res) =>
      res.text()
    );
  });

  const displayMessage = error ? null : message;

  return (
    <GreetingView message={displayMessage} loading={isLoading} />
  );
}