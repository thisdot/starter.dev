import { createDOM } from '@builder.io/qwik/testing';
import { describe, expect, it } from 'vitest';
import { Counter } from './counter';

describe('Counter component', function () {
  it('should render', async () => {
    const { render, screen } = await createDOM();

    await render(<Counter />);

    expect(screen.querySelectorAll('button').length).toBe(3);
    expect(screen.querySelector('h2')?.textContent).toBe('Count: 0');
  });

  it('should increment', async () => {
    const { render, screen, userEvent } = await createDOM();

    await render(<Counter />);

    const plusButton = screen.querySelectorAll('button')[0];
    // eslint-disable-next-line qwik/no-use-after-await
    await userEvent(plusButton, 'click');
    expect(screen.querySelector('h2')?.textContent).toBe('Count: 1');
  });

  it('should decrement', async () => {
    const { render, screen, userEvent } = await createDOM();

    await render(<Counter />);

    const plusButton = screen.querySelectorAll('button')[0];
    // eslint-disable-next-line qwik/no-use-after-await
    await userEvent(plusButton, 'click');
    expect(screen.querySelector('h2')?.textContent).toBe('Count: 1');

    // eslint-disable-next-line qwik/no-use-after-await
    await userEvent(plusButton, 'click');
    expect(screen.querySelector('h2')?.textContent).toBe('Count: 2');

    const minusButton = screen.querySelectorAll('button')[1];
    // eslint-disable-next-line qwik/no-use-after-await
    await userEvent(minusButton, 'click');
    expect(screen.querySelector('h2')?.textContent).toBe('Count: 1');
  });

  it('should reeset the counter', async () => {
    const { render, screen, userEvent } = await createDOM();

    await render(<Counter />);

    const plusButton = screen.querySelectorAll('button')[0];
    // eslint-disable-next-line qwik/no-use-after-await
    await userEvent(plusButton, 'click');
    expect(screen.querySelector('h2')?.textContent).toBe('Count: 1');

    // eslint-disable-next-line qwik/no-use-after-await
    await userEvent(plusButton, 'click');
    expect(screen.querySelector('h2')?.textContent).toBe('Count: 2');

    const resetButton = screen.querySelectorAll('button')[2];
    // eslint-disable-next-line qwik/no-use-after-await
    await userEvent(resetButton, 'click');
    expect(screen.querySelector('h2')?.textContent).toBe('Count: 0');
  });
});
