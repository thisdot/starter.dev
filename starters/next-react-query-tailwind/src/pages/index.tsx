import type { NextPage } from 'next';
import Head from 'next/head';
import { Greeting } from '../components/Greeting';
import { Counter } from '../components/Counter';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>next-react-query-tailwind starter kit</title>
        <meta name="description" content="Generated using starter.dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen grid grid-rows-2 grid-flow-col">
        <div className="flex items-center justify-center bg-gray-800 relative">
          <Greeting />
        </div>
        <div className="flex items-center justify-center">
          <Counter />
        </div>
      </div>
    </div>
  );
};

export default Home;
