// @refresh reload
import { Suspense } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import './root.css';

import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

export default function Root() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        staleTime: 1000,
      },
    },
  });
  return (
    <Html lang="en">
      <Head>
        <Title>
          Solid Start - Tanstack Query - Tailwind CSS - CSS Modules Kit
        </Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <QueryClientProvider client={queryClient}>
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
        <Scripts />
      </Body>
    </Html>
  );
}
