import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Counter } from './Counter';

describe('Counter', () => {
  test('count should initially set 0', () => {
    render(<Counter />);
    const displayElement = screen.getByRole('status');
    expect(displayElement).toHaveTextContent('Count: 0');
  });

  test('count should increase by 1 when clicking Increment button', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const buttonIncrement = screen.getByText('Increment');
    const displayElement = screen.getByRole('status');
    expect(displayElement).toHaveTextContent('Count: 0');

    await user.click(buttonIncrement);
    expect(displayElement).toHaveTextContent('Count: 1');

    await user.click(buttonIncrement);
    expect(displayElement).toHaveTextContent('Count: 2');
  });

  test('should decrease by 1 when clicking button', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const buttonDecrement = screen.getByText('Decrement');
    const displayElement = screen.getByRole('status');
    expect(displayElement).toHaveTextContent('Count: 0');

    await user.click(buttonDecrement);
    expect(displayElement).toHaveTextContent('Count: -1');

    await user.click(buttonDecrement);
    expect(displayElement).toHaveTextContent('Count: -2');
  });

  test('reset count to 0 when reset', async () => {
    render(<Counter />);
    const user = userEvent.setup();

    const resetButton = screen.getByText('Reset');
    const buttonIncrement = screen.getByText('Increment');
    const displayElement = screen.getByRole('status');
    expect(displayElement).toHaveTextContent('Count: 0');

    await user.click(buttonIncrement);
    await user.click(buttonIncrement);
    await user.click(buttonIncrement);

    expect(displayElement).toHaveTextContent('Count: 3');

    await user.click(resetButton);
    expect(displayElement).toHaveTextContent('Count: 0');
  });
});
