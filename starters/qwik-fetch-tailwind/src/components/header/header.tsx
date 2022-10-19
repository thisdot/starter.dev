import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

import * as styles from './header.classNames';

export const counterPath = '/counter';
export const dataFetchingPath = '/data-fetching';

export default component$(() => {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.headerWrapper}>
          <a href="/" className={styles.logo}>
            ⚡️Qwik Starter
          </a>

          <div className={styles.navWrapper}>
            <a
              href="/"
              className={pathname !== counterPath && pathname !== dataFetchingPath ? styles.linkActive : styles.link}
            >
              Home
            </a>
            <a href="/counter" className={pathname === counterPath ? styles.linkActive : styles.link}>
              Counter Example
            </a>
            <a href="/data-fetching" className={pathname === dataFetchingPath ? styles.linkActive : styles.link}>
              Data Fetching Example
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
});
