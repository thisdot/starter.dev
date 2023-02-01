import { render } from 'solid-testing-library';
import {
  describe,
  expect,
  it,
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
} from 'vitest';
import 'whatwg-fetch';
import { server } from '../../mock/serverSetup';
import { Greeting } from '.';
import { Router } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      staleTime: 1000,
    },
  },
});

describe('Greeting', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = render(() => (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Greeting />
        </Router>
      </QueryClientProvider>
    ));
  });
  it('should mount', async () => {
    expect(wrapper).toBeTruthy();
  });

  it('should show the mocked greeting', async () => {
    expect(
      await wrapper.findByText('Hi Learners from This Dot Labs!')
    ).toBeTruthy();
  });
});
