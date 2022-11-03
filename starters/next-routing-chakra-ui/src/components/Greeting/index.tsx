import { useEffect, useState } from 'react';

export const Greeting = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetch(`https://api.starter.dev/hello?greeting=from This Dot Labs!`)
      .then((res) => res.text())
      .then((data) => {
        setGreeting(data);
      })
      .catch((error) => {
        setError(true);
        console.error(`There was an error fetching your data: ${error}`);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // TODO: adding css for grey background while loading. Check with next example on loading text
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // TODO: style something nice here
  if (error) {
    return <p>Error!</p>;
  }

  return (
    <>
      <p>Message:</p>
      <p>{greeting}</p>
    </>
  );
};
