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
      </main>
    </>
  );
});
