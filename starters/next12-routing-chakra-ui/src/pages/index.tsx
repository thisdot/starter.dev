import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NextJS 12 and Chakra UI starter kit</title>
        <meta name="description" content="This is a starter kit for NextJS and Chakra UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="">
        <h1 className="">Create Next app with NextJS 12, Chakra UI</h1>
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
