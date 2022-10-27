import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS and Chakra UI starter kit</title>
        <meta name="description" content="This is a starter kit for NextJS and Chakra UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>NextJS and Chakra UI starter kit</h1>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
