import { Text, Center } from "@chakra-ui/react";

export const Greeting = ({ name }: { name: string | string[] | undefined }) => {
  return (
    <Center my={4}>
      <Text fontSize="xl">Message: {name}</Text>
    </Center>
  );
};
