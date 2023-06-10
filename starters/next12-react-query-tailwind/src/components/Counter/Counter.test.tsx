import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  it('should initially set 0', () => {
    render(<Counter />);

    const displayElement = screen.getByRole('display-element');
    expect(displayElement).toHaveTextContent('Count: 0');
  });

  it('should increase by 1 when clicking button', () => {
    render(<Counter />);

    const buttonIncrement = screen.getByRole('button-increment');
    fireEvent.click(buttonIncrement);
    const displayElement = screen.getByRole('display-element');
    expect(displayElement).toHaveTextContent('Count: 1');

    fireEvent.click(buttonIncrement);
    expect(displayElement).toHaveTextContent('Count: 2');
  });

  it('should decrease by 1 when clicking button', () => {
    render(<Counter />);

    const buttonDecrement = screen.getByRole('button-decrement');
    fireEvent.click(buttonDecrement);
    const displayElement = screen.getByRole('display-element');
    expect(displayElement).toHaveTextContent('Count: -1');

    fireEvent.click(buttonDecrement);
    expect(displayElement).toHaveTextContent('Count: -2');
  });
});
