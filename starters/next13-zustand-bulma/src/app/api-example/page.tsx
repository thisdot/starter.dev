import styles from './page.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { Greeting } from '@/components/Greeting';
import { Suspense } from 'react';

// Static metadata
export const metadata = {
  title: 'API Example',
};

type Props = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default function ApiExamplePage({ searchParams }: Props) {
  let greeting = searchParams?.greeting;

  if (Array.isArray(greeting)) {
    greeting = greeting.join(', ');
  }

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
        <div className="block px-5 is-relative">
          <Suspense fallback={<span className={styles.loader}></span>}>
            {/* @ts-expect-error Async Server Component - please read: https://beta.nextjs.org/docs/data-fetching/fetching#asyncawait-in-server-components for more info */}
            <Greeting greeting={greeting} />
            {
              // show link if greeting is not default
              !greeting ? (
                <Link
                  className="is-underlined"
                  href={{
                    pathname: '/api-example',
                    query: {
                      greeting: 'young padawan!',
                    },
                  }}
                >
                  Try out a different greeting changing the URL!
                </Link>
              ) : null
            }
          </Suspense>
        </div>
        <div className="block is-size-5">
          <Link className="is-underlined" href="/">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
