import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from 'solid-testing-library';
import CounterExample from './Counter';

describe('CounterExample', () => {
  it('should mount', async () => {
    const wrapper = await render(() => <CounterExample />);
    expect(wrapper).toBeTruthy();
  });

  it('should mount and increment', async () => {
    await render(() => <CounterExample />);
    const button = await screen.getByText('Increment');
    fireEvent.click(button);
    expect(screen.getByText('Count: 1')).toBeDefined();
  });

  it('should mount and decrement', async () => {
    await render(() => <CounterExample />);
    const button = await screen.getByText('Decrement');
    fireEvent.click(button);
    expect(screen.getByText('Count: 0')).toBeDefined();
    fireEvent.click(button);
    expect(screen.getByText('Count: -1')).toBeDefined();
  });

  it('should mount and reset', async () => {
    await render(() => <CounterExample />);
    const ResetButton = await screen.getByText('Reset');
    fireEvent.click(ResetButton);
    expect(screen.getByText('Count: 0')).toBeDefined();
  });
});
