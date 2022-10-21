import { render, screen, fireEvent } from 'solid-testing-library';
import { describe, it, expect } from 'vitest';
import CounterExample from './index';

describe('', () => {
  it('should mount', async () => {
    const wrapper = await render(() => <CounterExample />);
    expect(wrapper).toBeTruthy();
  });

  it('should mount and increment', async () => {
    await render(() => <CounterExample />);
    const button = await screen.findByTestId('increment');
    expect(button).toBeVisible();
    fireEvent.click(button);
    const countText = await screen.getByText('Count: 1');
    expect(countText).toBeVisible();
  });
});
