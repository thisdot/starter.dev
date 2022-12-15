import type { NextPage } from "next";
import Link from "next/link";
import { Center, Heading } from "@chakra-ui/react";
import Counter from "../../components/counter/Counter";

const CounterExample: NextPage = () => {
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

      <Counter />

      <Center fontSize="xl" textDecoration="underline" color="#376fec">
        <Link href="/">Return Home</Link>
      </Center>
    </>
  );
};

export default CounterExample;
