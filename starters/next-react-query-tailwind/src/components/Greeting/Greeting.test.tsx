import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Greeting } from './Greeting.data';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const MOCK_HELLO_MESSAGE = 'Test Message';

const server = setupServer(
  rest.get('https://api.starter.dev/hello', (req, res, ctx) => {
    return res(ctx.text(MOCK_HELLO_MESSAGE))
  }),
)

describe('Greeting', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should show loading state before fetched the data from api', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Greeting />
      </QueryClientProvider>
    );

    const displayMessage = screen.getByRole('display-message')
    expect(displayMessage).toHaveClass('grow animate-pulse bg-gray-200 rounded-md');
  });

  it('should display loaded data', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Greeting />
      </QueryClientProvider>
    );

    expect(await screen.findByText(MOCK_HELLO_MESSAGE)).toBeVisible();
    const displayMessage = screen.getByRole('display-message')
    expect(displayMessage).toHaveClass('grow-0');
  });
});
