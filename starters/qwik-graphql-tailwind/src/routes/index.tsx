import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import * as styles from './homepage.classNames';

export default component$(() => {
  return (
    <>
      <header className={styles.header}>Qwik, GraphQL and Tailwind CSS Starter kit</header>
      <div className={styles.linksContainer}>
        <Link href="/counter" className={styles.link}>
          See Counter example component
        </Link>
        <Link href="./data-fetching" className={styles.link}>
          See Fetch example component
        </Link>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik Starter Kit',
};
