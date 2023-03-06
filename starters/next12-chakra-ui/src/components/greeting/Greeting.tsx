import { Text, Center } from "@chakra-ui/react";

type GreetingParams = {
  msg: string;
};
export const Greeting = ({ msg }: GreetingParams) => {
  return (
    <Center my={4}>
      <Text fontSize="xl">Message: {msg}</Text>
    </Center>
  );
};
