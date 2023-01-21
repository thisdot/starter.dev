import { Heading, Button, Text, Flex } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const counterButtons: {
    text: string;
    setCounterState: SetStateAction<number>;
  }[] = [
    { text: "Increment", setCounterState: count + 1 },
    { text: "Decrement", setCounterState: count - 1 },
    { text: "Reset", setCounterState: 0 },
  ];

  const setColorText = () => {
    if (count === 0) {
      return "black";
    } else if (count > 0) {
      return "green.600";
    } else {
      return "red.500";
    }
  };

  return (
    <Flex
      flexDirection={{ sm: "column", md: "row" }}
      justifyContent="space-around"
      my={8}
      alignItems="center"
    >
      <Flex alignItems="center">
        <Heading role="heading" mr={2} as="h2">
          Count:
        </Heading>
        <Text fontSize="4xl" color={setColorText()}>
          {count}
        </Text>
      </Flex>

      {counterButtons.map(({ text, setCounterState }, idx) => (
        <Button
          my={8}
          key={`${idx}-${text}`}
          onClick={() => setCount(setCounterState)}
          colorScheme="brand"
          variant="solid"
          role="button"
        >
          {text}
        </Button>
      ))}
    </Flex>
  );
};
