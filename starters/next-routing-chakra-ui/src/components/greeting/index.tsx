import { useEffect, useState } from 'react';
import { Text, Center, Alert, AlertIcon, AlertTitle, AlertDescription, Skeleton } from '@chakra-ui/react';

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

  if (isLoading) {
    return (
      <Center my={4}>
        <Text display="block" fontSize="2xl">
          Loading data...
          <Skeleton startColor="blue.500" endColor="blue.700" height="20px" />
        </Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Alert my={8} w="50%" mx="auto" status="error">
        <AlertIcon />
        <AlertTitle fontSize="xl">Error!</AlertTitle>
        <AlertDescription fontSize="xl"> There was an issue with loading your data. Please refresh the page or try again later.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Center my={4}>
      <Text fontSize="xl">Message: {greeting}</Text>
    </Center>
  );
};
