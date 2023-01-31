import { Router } from '@solidjs/router';
import { Greeting } from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import greetingHandler from '../../mock/greetingHandler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      staleTime: 1000,
    },
  },
});

export default {
  title: 'Component/Fetch Example',
  component: Greeting,
  argTypes: {},
  parameters: {
    msw: {
      handlers: [greetingHandler],
    },
  },
};

export const FetchExample = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Greeting />
    </Router>
  </QueryClientProvider>
);
