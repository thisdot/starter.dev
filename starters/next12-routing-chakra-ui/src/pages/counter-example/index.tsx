import type { NextPage } from "next";
import Link from "next/link";
import { Center, Heading, Button, Text, Flex } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";

const CounterExample: NextPage = () => {
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
    <>
      <Center>
        <Heading
          role="heading"
          as="h1"
          pb={4}
          borderBottom="4px solid #2464ec"
          mt={8}
        >
          Increment, Decrement and Reset Button Examples
        </Heading>
      </Center>

      <Flex justifyContent="space-around" my={8} alignItems="center">
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

      <Center fontSize="xl" textDecoration="underline" color="#376fec">
        <Link href="/">Return Home</Link>
      </Center>
    </>
  );
};

export default CounterExample;
