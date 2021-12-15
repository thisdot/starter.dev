import { useQuery } from 'react-query';
import { GreetingView } from './Greeting.view';

export function Greeting() {
  const {
    data: greeting,
    isLoading,
    refetch,
    error,
  } = useQuery<{ message: string }>('hello', async () => {
    return await fetch('http://localhost:3000/api/hello').then((res) =>
      res.json()
    );
  });

  const handleGreetingClick = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div
        data-testid="loading"
        className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-25 animate-pulse"
      />
    );
  }

  if (error || !greeting) {
    return null;
  }

  return (
    <GreetingView message={greeting.message} onClick={handleGreetingClick} />
  );
}
