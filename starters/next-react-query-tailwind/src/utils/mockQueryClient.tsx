/* eslint-disable react/display-name */
import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

if (process.env.NODE_ENV === 'test') {
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
  });
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const createQueryProvider = () => {
  const queryClient = createQueryClient();
  return ({ children }: { children: ReactElement }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
