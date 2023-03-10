import styles from './page.module.scss';
import clsx from 'clsx';
import Link from 'next/link';

// Static metadata
export const metadata = {
  title: 'API Example',
};

export default function ApiExamplePage() {
  return (
    <main className="container section">
      <div className="has-text-centered">
        <h1
          className={clsx(
            styles.heading,
            'title is-3 has-text-weight-bold pb-5'
          )}
        >
          API Example: Fetch Data using API route
        </h1>
        <div className="block px-5">{/* Add Greeting Component Here */}</div>
        <div className="block is-size-5">
          <Link className="is-underlined" href="/">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
