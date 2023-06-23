import { Heading, Button, Text, Flex } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type CountStateParams = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

export const Counter = ({ count, setCount }: CountStateParams) => {
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

      {counterButtons.map(({ text, setCounterState }) => (
        <Button
          my={8}
          key={text}
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
