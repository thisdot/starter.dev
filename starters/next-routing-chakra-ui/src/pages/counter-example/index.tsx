import type { NextPage } from "next";
import Link from "next/link";
import { Center, Heading, Button, Stack } from "@chakra-ui/react";
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

  return (
    <>
      <Center>
        <Heading as="h1" pb={4} borderBottom="4px solid #2464ec" mt={8}>
          Increment, Decrement and Reset Button Example
        </Heading>
      </Center>

      <Stack direction="row" spacing={8} align="center">
        <Heading as="h2">Count: {count}</Heading>

        {counterButtons.map(({ text, setCounterState }, idx) => (
          <Button
            key={`${idx}-${text}`}
            onClick={() => setCount(setCounterState)}
            colorScheme="teal"
            variant="solid"
            role="button"
          >
            {text}
          </Button>
        ))}
      </Stack>

      <Center fontSize="xl" textDecoration="underline" color="#376fec">
        <Link href="/">Return Home</Link>
      </Center>
    </>
  );
};

export default CounterExample;
