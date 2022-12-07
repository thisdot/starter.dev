import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
import * as styles from './layout.classNames';

export default component$(() => {
  return (
    <>
      <main className={styles.main}>
        <Header />
        <section className={styles.container}>
          <Slot />
        </section>
        <div className="flex justify-center">
          <a href="https://www.netlify.com">
            <img src="https://www.netlify.com/v3/img/components/netlify-light.svg" alt="Deploys by Netlify" />
          </a>
        </div>
      </main>
    </>
  );
});
