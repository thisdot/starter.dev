import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <main class="min-h-screen bg-blue-50">
      <section class="py-5">
        <Slot />
      </section>
    </main>
  );
});
