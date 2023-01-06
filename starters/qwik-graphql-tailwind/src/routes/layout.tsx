import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <main class="bg-blue-50 min-h-screen">
        <section>
          <Slot />
        </section>
      </main>
    </>
  );
});
