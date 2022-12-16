import { component$, Slot } from '@builder.io/qwik';
import * as styles from './layout.classNames';

export default component$(() => {
  return (
    <>
      <main className={styles.main}>
        <section>
          <Slot />
        </section>
      </main>
    </>
  );
});
