import type { NextPage } from "next";
import Link from "next/link";
import { Center, Heading } from "@chakra-ui/react";

const CounterExample: NextPage = () => {
  return (
    <>
      <Center>
        <Heading as="h1" pb={4} borderBottom="4px solid #2464ec" mt={8}>
          Increment, Decrement and Reset Button Example
        </Heading>
      </Center>

      <div className="">{/*counter goes here*/}</div>
      <Center fontSize="xl" textDecoration="underline" color="#376fec">
        <Link href="/">Return Home</Link>
      </Center>
    </>
  );
};

export default CounterExample;
