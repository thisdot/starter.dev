import { useQuery } from 'react-query';
import { GreetingView } from './Greeting.view';

export function Greeting() {
  const {
    data: message,
    isLoading,
    error,
  } = useQuery<string, Error>('hello', async () => {
    const response = await fetch('https://dasaasdasdasdasdsadsadassdd.com/hello1?greeting=from This Dot Labs!');
    return await response.text();
  }, { retry: false });

  return (
    <GreetingView message={message} loading={isLoading} errorMessage={error?.message} />
  );
}