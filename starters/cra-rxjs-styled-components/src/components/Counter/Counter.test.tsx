import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  it('should increase by 1 when clicking button', () => {
    render(<Counter />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('0');

    fireEvent.click(button);
    expect(button).toHaveTextContent('1');

    fireEvent.click(button);
    expect(button).toHaveTextContent('2');
  });
});
