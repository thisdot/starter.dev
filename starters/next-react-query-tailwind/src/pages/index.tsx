import type { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { NavigationLink } from 'src/components';

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>next12-react-query-tailwind starter kit</title>
        <meta name="description" content="Generated using starter.dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-3/5 my-5 mx-auto text-center">
        <h1 className="bg-blue-600 text-white text-2xl font-semibold p-4 rounded">
          Create Next app with React Query and Tailwind
        </h1>
        <ul>
          <li className="my-2.5">
            <NavigationLink
              to="/counter-example"
              label="See Counter example component"
            />
          </li>
          <li className="my-2.5">
            <NavigationLink
              to="/fetch-example"
              label="See Fetch example component"
            />
          </li>
        </ul>
      </header>
    </Fragment>
  );
};

export default Home;
