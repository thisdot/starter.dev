import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Greeting } from '../../components/greeting';
import { Heading, Center } from '@chakra-ui/react';

const checkSlugType = (slug: string[] | string | undefined) => {
  if (slug === undefined) {
    return 'This Dot Labs';
  }
  return slug === typeof 'string' ? slug : slug[slug.length - 1];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;

  const res = await fetch(`https://api.starter.dev/hello?greeting=from ${checkSlugType(slug)}!`);
  const userStr = await res.text();

  return {
    props: { userStr },
  };
};

const FetchExample: NextPage<{ userStr: string }> = ({ userStr }) => {
  return (
    <div>
      <Center>
        <Heading pb={4} borderBottom="4px solid #2464ec" mt={8}>
          NextJS 12 Fetching Data From API
        </Heading>
      </Center>

      <Greeting name={userStr} />
      <Center fontSize="xl" textDecoration="underline" color="#376fec">
        <Link href="/">Return Home</Link>
      </Center>
    </div>
  );
};

export default FetchExample;
