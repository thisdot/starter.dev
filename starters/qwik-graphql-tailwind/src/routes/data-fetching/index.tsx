import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { APP_TITLE } from '~/utils/constants';
import { DataFetching } from './data-fetching';

export default component$(() => {
  return <DataFetching />;
});

export const head: DocumentHead = {
  title: `Data Fetching | ${APP_TITLE}`,
};
