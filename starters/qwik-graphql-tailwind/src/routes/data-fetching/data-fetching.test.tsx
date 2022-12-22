import { render } from '@builder.io/qwik';
import { ElementFixture } from '@builder.io/qwik/testing';
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
  it('should assert true', async () => {
    // just example test
    expect(true).toBe(true);
  });

  it('should render', async () => {
    const fixture = new ElementFixture();
    const spy = vi.spyOn(global, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        text: () => Promise.resolve('Hello World'),
      } as any);
    });

    await render(fixture.host, <DataFetching />);

    expect(fixture.host.querySelectorAll('input').length).toBe(1);
    expect(fixture.host.querySelector('.text-5xl')?.textContent).toBe('Loading...');

    // Wait for the fetch to be called.
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(spy).toBeCalledWith('https://api.starter.dev/graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        query: GET_GREETING,
        variables: { greeting: 'from This Dot Labs!' },
      }),
      signal: new AbortController().signal,
    });
  });
});
