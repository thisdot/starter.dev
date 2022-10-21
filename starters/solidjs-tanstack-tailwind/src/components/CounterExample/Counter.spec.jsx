import { fireEvent, render, screen } from 'solid-testing-library';
import { describe, expect, it } from 'vitest';
import { CounterExample } from '.';

describe('CounterExample', () => {
  it('should mount', async () => {
    const wrapper = await render(() => <CounterExample />);
    expect(wrapper).toBeTruthy();
  });

  it('should mount and increment', async () => {
    await render(() => <CounterExample />);
    const button = await screen.getByText('Increment');
    expect(button).toBeVisible();
    fireEvent.click(button);
    const countText = await screen.getByText('Count: 1');
    expect(countText).toBeVisible();
  });
});
