import clsx from 'clsx';
import Link from 'next/link';
import styles from './page.module.scss';

// Static metadata
export const metadata = {
  title: 'Counter Example',
};

export default function CounterPage() {
  return (
    <main className="container section">
      <div className="has-text-centered">
        <h1
          className={clsx(
            styles.heading,
            'title is-3 has-text-weight-bold pb-5'
          )}
        >
          Increment, Decrement and Reset Button Example
        </h1>
        <div className="block px-5">{/* Add Counter Component Here */}</div>
        <div className="block is-size-5">
          <Link className="is-underlined" href="/">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
