import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS and Chakra UI starter kit</title>
        <meta name="description" content="This is a starter kit for NextJS and Chakra UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="">
        <h1 className="">Create Next app with NextJS, Chakra UI</h1>
        <ul>
          <li className="">
            <Link href="/counter-example">See Counter example component</Link>
          </li>
          <li className="">
            <Link href="/fetch-example">See Fetch example component</Link>
          </li>
        </ul>
      </header>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
