import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { APP_TITLE } from '~/utils/constants';
import { Counter } from './counter';

export default component$(() => {
  return (
    <div>
      <Counter />
    </div>
  );
});

export const head: DocumentHead = {
  title: `Counter | ${APP_TITLE}`,
};
