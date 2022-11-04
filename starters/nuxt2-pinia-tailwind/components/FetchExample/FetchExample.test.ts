import { rest } from 'msw';
import axios from 'axios';
import FetchExample from './FetchExample.vue';
import { render, screen, waitFor } from '@/test/utils';
import { mswServer } from '~/test/__mocks__/mswServer';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe('<FetchExample />', () => {
  it('Should display correct message', async () => {
    // Arrange
    const componentOptions = {
      mocks: {
        $nuxt: {
          context: {
            $axios: axios,
          },
        },
      },
      stubs: {
        NuxtLink: true,
      },
    }

    // Act
    render(FetchExample, componentOptions);

    // Assertions
    await waitFor(() => {
      const messageValue = screen.getByTestId('message-value');
      expect(messageValue).toHaveTextContent('Hello, from This Dot Labs!');
    });
  });

  it('Should display error message', async () => {
    // Arrange
    mswServer.use(
      rest.get('https://api.starter.dev/hello', (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const componentOptions = { 
      mocks: {
        $nuxt: {
          context: {
            $axios: axios,
          },
        },
      },
      stubs: {
        NuxtLink: true,
      },
    }

    // Act
    render(FetchExample, componentOptions);

    // Assertions
    await waitFor(() => {
      const messageValue = screen.getByTestId('message-value');
      expect(messageValue).toHaveTextContent('Error!');
    });
  });

  it('Should display loading skeleton', () => {
    // Arrange
    const componentOptions = {
      mocks: {
        $nuxt: {
          context: {
            $axios: axios,
          },
        },
      },
      stubs: {
        NuxtLink: true,
      },
    }
    
    // Act
    render(FetchExample,componentOptions);

    const messageSkeleton = screen.getByTestId('message-skeleton');

    // Assertions
    expect(messageSkeleton).toBeVisible();
  });
});
