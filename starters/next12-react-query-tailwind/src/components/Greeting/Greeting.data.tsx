import { useQuery } from '@tanstack/react-query';
import { GreetingView } from './Greeting.view';

export function Greeting() {
  const {
    data: message,
    isLoading,
    error,
  } = useQuery<string, Error>(
    ['hello'],
    async () => {
      const response = await fetch(
        'https://api.starter.dev/.netlify/functions/server/hello?greeting=from This Dot Labs!'
      );
      if (!response.ok) {
        const bodyText = await response.text();
        const bodyJson = bodyText ? JSON.parse(bodyText) : null;
        const errorData = bodyJson?.message
          ? bodyJson
          : { message: `Request error: ${response.statusText}` };
        return await Promise.reject(errorData);
      }
      return await response.text();
    },
    { retry: false }
  );

  return (
    <GreetingView
      message={message}
      loading={isLoading}
      errorMessage={error?.message}
    />
  );
}
