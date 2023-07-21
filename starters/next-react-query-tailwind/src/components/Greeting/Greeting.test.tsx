import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Greeting } from './Greeting.data';
import { setupServer, SetupServer } from 'msw/node';
import { rest } from 'msw';
import "whatwg-fetch";

const MOCK_MESSAGE_HELLO = 'Test Message Hello';
const MOCK_MESSAGE_ERROR = 'Test Message Error';

describe('Greeting', () => {
  let server: SetupServer | null;

  const disposeServer = () => {
    server?.close();
    server = null;
  };

  afterEach(() => server?.resetHandlers());

  describe('positive flow', () => {
    beforeAll(() => {
      server = setupServer(
        rest.get(
          'https://api.starter.dev/.netlify/functions/server/hello',
          (_, res, ctx) => {
            return res(ctx.text(MOCK_MESSAGE_HELLO));
          }
        )
      );
      server.listen();
    });

    afterAll(disposeServer);

    it('should show a loading state when the API is still fetching and the data has loaded', async () => {
      render(
        <QueryClientProvider client={new QueryClient()}>
          <Greeting />
        </QueryClientProvider>
      );

      const displayMessage = screen.getByRole('display-message');
      expect(displayMessage).toHaveClass(
        'grow animate-pulse bg-gray-200 rounded-md'
      );
    });

    it('should see the data after the data loads', async () => {
      render(
        <QueryClientProvider client={new QueryClient()}>
          <Greeting />
        </QueryClientProvider>
      );

      expect(await screen.findByText(MOCK_MESSAGE_HELLO)).toBeVisible();
      const displayMessage = screen.getByRole('display-message');
      expect(displayMessage).toHaveClass('grow-0');
      expect(displayMessage).toHaveTextContent(MOCK_MESSAGE_HELLO);
    });
  });

  describe('negative flow', () => {
    afterAll(disposeServer);

    it('should show an error message if the API call response contains a message in the body.', async () => {
      server = setupServer(
        rest.get(
          'https://api.starter.dev/.netlify/functions/server/hello',
          (_, res, ctx) =>
            res(ctx.status(400), ctx.json({ message: MOCK_MESSAGE_ERROR }))
        )
      );
      server.listen();

      render(
        <QueryClientProvider client={new QueryClient()}>
          <Greeting />
        </QueryClientProvider>
      );

      expect(await screen.findByText(MOCK_MESSAGE_ERROR)).toBeVisible();
      const errorMessage = screen.getByRole('error-message');
      expect(errorMessage).toHaveTextContent(MOCK_MESSAGE_ERROR);
    });

    it('should show an error message if the API call response does not contain a message in the body.', async () => {
      server = setupServer(
        rest.get(
          'https://api.starter.dev/.netlify/functions/server/hello',
          (_, res, ctx) => res(ctx.status(404))
        )
      );
      server.listen();

      render(
        <QueryClientProvider client={new QueryClient()}>
          <Greeting />
        </QueryClientProvider>
      );
      const MESSAGE_EXPECTED = 'Test Message Error';

      expect(await screen.findByText(MESSAGE_EXPECTED)).toBeVisible();
      const errorMessage = screen.getByRole('error-message');
      expect(errorMessage).toHaveTextContent(MESSAGE_EXPECTED);
    });
  });
});
