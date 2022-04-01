import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  it('should increase by 1 when clicking button', () => {
    render(<Counter />);

    const button = screen.getByText('+');
    const count = screen.getByRole('heading');
    expect(count).toHaveTextContent('0');

    fireEvent.click(button);
    expect(count).toHaveTextContent('1');

    fireEvent.click(button);
    expect(count).toHaveTextContent('2');
  });
});
