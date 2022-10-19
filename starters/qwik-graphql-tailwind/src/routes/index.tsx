import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import * as styles from './homepage.classNames';

export default component$(() => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1Text}>Welcome to Qwik⚡️starter kit</h1>

      <ul className={styles.ul}>
        <li className={styles.li}>
          Check out the{' '}
          <Link href="/counter" className={styles.link}>
            Counter button example component
          </Link>
        </li>
        <li className={styles.li}>
          Check out the{' '}
          <Link href="./data-fetching" className={styles.link}>
            Data fetching example
          </Link>
        </li>
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik Starter Kit',
};
