import Counter from '$lib/components/Counter/Counter.svelte';
import { fireEvent, render, screen } from '@testing-library/svelte';

describe('Counter Component', () => {
  beforeEach(async () => {
    render(Counter);
    const resetButton = screen.getByText('Reset');
    await fireEvent.click(resetButton);
  });

  it('should render the component', () => {
    const span = screen.getByText(/Count:/);
    expect(span).toBeTruthy();
  });

  it('should have correct initial value', () => {
    const span = screen.getByText(/Count:/);
    expect(span.innerHTML).toBe('Count: 0');
  });

  it('should increase the counter value', async () => {
    const span = screen.getByText(/Count:/);
    const button = screen.getByText('Increment');
    expect(span.innerHTML).toBe('Count: 0');
    await fireEvent.click(button);
    expect(span.innerHTML).toBe('Count: 1');
    await fireEvent.click(button);
    expect(span.innerHTML).toBe('Count: 2');
  });

  it('should decrease the counter value', async () => {
    const span = screen.getByText(/Count:/);
    const button = screen.getByText('Decrement');
    expect(span.innerHTML).toBe('Count: 0');
    await fireEvent.click(button);
    expect(span.innerHTML).toBe('Count: -1');
    await fireEvent.click(button);
    expect(span.innerHTML).toBe('Count: -2');
  });

  it('should reset the counter value', async () => {
    const span = screen.getByText(/Count:/);
    const incrementButton = screen.getByText('Increment');
    const resetButton = screen.getByText('Reset');
    expect(span.innerHTML).toBe('Count: 0');
    await fireEvent.click(incrementButton);
    expect(span.innerHTML).toBe('Count: 1');
    await fireEvent.click(resetButton);
    expect(span.innerHTML).toBe('Count: 0');
  });
});
