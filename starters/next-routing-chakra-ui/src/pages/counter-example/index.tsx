import type { NextPage } from 'next';
import Link from 'next/link';
import { Center } from '@chakra-ui/react';

const Counter: NextPage = () => {
  return (
    <>
      This is for the counter example
      <Center fontSize="xl" textDecoration="underline" color="#376fec">
        <Link href="/">Return Home</Link>
      </Center>
    </>
  );
};

export default Counter;
