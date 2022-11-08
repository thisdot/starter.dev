import type { NextPage } from 'next';
import Link from 'next/link';
import { Greeting } from '../../components/greeting';
import { Heading, Center, Box } from '@chakra-ui/react';

const FetchExample: NextPage = () => {
  return (
    <div>
      <Center>
        <Heading pb={4} borderBottom="4px solid #2464ec" mt={8}>
          NextJS 12 Fetching Data From API
        </Heading>
      </Center>

      <Greeting />
      <Center fontSize="xl" textDecoration="underline" color="#376fec">
        <Link href="/">Return Home</Link>
      </Center>
    </div>
  );
};

export default FetchExample;
