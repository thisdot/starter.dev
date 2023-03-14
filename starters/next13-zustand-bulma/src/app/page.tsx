import styles from './page.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container section">
      <header className={styles.header}>
        <h1 className="is-size-4 has-text-centered has-text-weight-bold">
          Next.js 13 App with Zustand and Bulma
        </h1>
      </header>
      <div className="list is-size-5 has-text-centered">
        <ul>
          <li>
            <Link className="is-underlined" href="/counter-example">
              See Counter example component
            </Link>
          </li>
          <li>
            <Link className="is-underlined" href="/api-example">
              See Fetch example component
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
