import Counter from './Counter.svelte';
import { cleanup, fireEvent, render } from '@testing-library/svelte';

describe('Counter Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the component', () => {
    const { component } = render(Counter);
    expect(component).toBeTruthy();
  });

  it('should have correct initial value', () => {
    const { getByText } = render(Counter);
    const span = getByText(/Count:/);
    expect(span.innerHTML).toBe('Count: 0');
  });

  it('should increase the counter value', async () => {
    const { getByText } = render(Counter);
    const span = getByText(/Count:/);
    const button = getByText(/Increment/);
    expect(span.innerHTML).toBe('Count: 0');
    await fireEvent.click(button);
    expect(span.innerHTML).toBe('Count: 1');
    await fireEvent.click(button);
    expect(span.innerHTML).toBe('Count: 2');
  });

  it('should reset the counter value', async () => {
    const { getByText } = render(Counter);
    const span = getByText(/Count:/);
    const incrementButton = getByText(/Increment/);
    const resetButton = getByText(/Reset/);
    await fireEvent.click(incrementButton);
    await fireEvent.click(resetButton);
    expect(span.innerHTML).toBe('Count: 0');
  });

  it('should decrease the counter value', async () => {
    const { getByText, component } = render(Counter);
    console.log(component);
    const span = getByText(/Count:/);
    const button = getByText(/Decrement/);
    expect(span.innerHTML).toBe('Count: 0');
    await fireEvent.click(button);
    expect(span.innerHTML).toBe('Count: -1');
    await fireEvent.click(button);
    expect(span.innerHTML).toBe('Count: -2');
  });
});
