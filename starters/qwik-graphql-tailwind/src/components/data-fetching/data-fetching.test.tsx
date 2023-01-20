import { createDOM } from '@builder.io/qwik/testing';
import { describe, expect, it, vi, beforeAll } from 'vitest';
import { DataFetching } from './data-fetching';

const greetingValue = 'there';
vi.mock('@builder.io/qwik', async () => {
  const qwik = await vi.importActual<typeof import('@builder.io/qwik')>('@builder.io/qwik');
  return {
    ...qwik,
    useContext: () => ({}),
    useStore: () => ({
      greeting: greetingValue,
    }),
  };
});

beforeAll(() => {
  // Mock fetch so that we don't make real network requests.
  const FetchMock = vi.fn(() => ({
    json: vi.fn(() => Promise.resolve({ data: { hello: `Hello, ${greetingValue}` } })),
  }));

  vi.stubGlobal('fetch', FetchMock);
});

describe('Fetching component', function () {
  it('should render', async () => {
    const { render, screen, userEvent } = await createDOM();

    await render(<DataFetching />);

    expect(screen.querySelectorAll('input').length).toBe(1);
    expect(screen.querySelector('.text-left')?.textContent).toBe('Loading...');

    // Wait for the fetch to be called.
    await new Promise((resolve) => setTimeout(resolve, 100));

    // eslint-disable-next-line qwik/no-use-after-await
    await userEvent(screen.querySelector('input'), 'change');
    expect(screen.querySelector('.text-left')?.textContent).toBe(`Hello, ${greetingValue} from This Dot Labs!`);
  });
});
