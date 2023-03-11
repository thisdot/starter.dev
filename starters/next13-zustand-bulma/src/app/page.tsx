import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Next.js 13 App with Zustand and Bulma</h1>
        <ul className={styles.list}>
          <li>
            <a href="/counter">See Counter example component</a>
          </li>
          <li>
            <a href="/api-example">See Fetch example component</a>
          </li>
        </ul>
      </header>
    </main>
  );
}
