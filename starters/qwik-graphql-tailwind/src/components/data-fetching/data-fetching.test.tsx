import { createDOM } from '@builder.io/qwik/testing';
import { describe, expect, it, vi, beforeAll } from 'vitest';
import { DataFetching, GET_GREETING } from './data-fetching';

beforeAll(() => {
  // Mock fetch so that we don't make real network requests.
  const FetchMock = vi.fn(() => ({
    json: vi.fn(() => Promise.resolve({ data: { hello: 'Hello, there' } })),
  }));

  vi.stubGlobal('fetch', FetchMock);
});

describe('Fetching component', function () {
  it('should render', async () => {
    const { render, screen, userEvent } = await createDOM();
    const spy = vi.spyOn(global, 'fetch');

    await render(<DataFetching />);

    expect(screen.querySelectorAll('input').length).toBe(1);
    expect(screen.querySelector('.text-left')?.textContent).toBe('Loading...');

    // Wait for the fetch to be called.
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(spy).toBeCalledWith('https://api.starter.dev/.netlify/functions/graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        query: GET_GREETING,
        variables: { greeting: '' },
      }),
      signal: expect.any(AbortSignal),
    });

    // eslint-disable-next-line qwik/no-use-after-await
    await userEvent(screen.querySelector('input'), 'change');
    expect(screen.querySelector('.text-left')?.textContent).toBe('Hello, there from This Dot Labs!');
  });
});
