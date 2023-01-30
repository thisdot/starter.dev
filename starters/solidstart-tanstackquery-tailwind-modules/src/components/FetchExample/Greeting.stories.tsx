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
  title: 'Example/Fetch Example',
  component: Greeting,
  argTypes: {},
  parameters: {
    msw: {
      handlers: [greetingHandler]
    },
    // mockData: [
    //   {
    //     url: 'https://api.starter.dev/.netlify/functions/server/hello?greeting=',
    //     method: 'GET',
    //     status: 200,
    //     response: () => 'Hi storybook user!',
    //     delay: 1000,
    //   },
    // ],
  },
};

export const FetchExample = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Greeting />
    </Router>
  </QueryClientProvider>
);
