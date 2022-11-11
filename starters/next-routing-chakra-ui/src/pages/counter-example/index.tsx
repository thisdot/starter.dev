import type { NextPage } from "next";
import Link from "next/link";
import { Center, Heading, Button } from "@chakra-ui/react";
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

      <div className="flex justify-evenly whitespace-nowrap">
        <h2 className="text-2xl font-bold" role="display-element">
          Count: {count}
        </h2>
        {counterButtons.map((btn, idx) => (
          <Button
            key={`${idx}-${btn.text}`}
            onClick={() => setCount(btn.setCounterState)}
            colorScheme="blue"
            role="button"
          >
            {btn.text}
          </Button>
        ))}
      </div>
      <Center fontSize="xl" textDecoration="underline" color="#376fec">
        <Link href="/">Return Home</Link>
      </Center>
    </>
  );
};

export default CounterExample;
