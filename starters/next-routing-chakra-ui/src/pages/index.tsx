import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Heading } from '@chakra-ui/react';
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NextJS 12 and Chakra UI starter kit</title>
        <meta name="description" content="This is a starter kit for NextJS 12 and Chakra UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="">
        <Heading bg="blue">Create Next app with NextJS 12, Chakra UI</Heading>
        <ul>
          <li className="">
            <Link href="/counter-example">See Counter example component</Link>
          </li>
          <li className="">
            <Link href="/fetch-example">See Fetch example component</Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Home;
