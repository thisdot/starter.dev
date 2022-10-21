// Inspired by https://github.com/TahaSh/qwikql/blob/main/src/useQuery.ts

import { $ } from '@builder.io/qwik';

export interface QueryOptions {
  url: string;
  variables?: Record<string, unknown>;
  signal?: AbortSignal;
}

export const useQuery = (query: string) => {
  const executeQuery$ = $(
    async ({ url, signal, variables }: QueryOptions) =>
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
        body: JSON.stringify({
          query,
          variables,
        }),
      })
  );

  return { executeQuery$ };
};
