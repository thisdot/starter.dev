import { render, screen, fireEvent } from 'solid-testing-library';
import { describe, it, expect } from 'vitest';
import CounterExample from './index';

describe('', () => {
  it('should mount', async () => {
    const wrapper = await render(() => <CounterExample />);
    expect(wrapper).toBeTruthy();
  });

  it('should mount', async () => {
    await render(() => <CounterExample />);
    const button = await screen.findByText('Increment');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});
