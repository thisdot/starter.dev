import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';
import { MemoryRouter } from 'react-router-dom';

describe('Increment Counter', () => {
  it('should increase by 1 when clicking button', () => {
    render(<Counter />, { wrapper: MemoryRouter });

    const currentCount = screen.getByText('Count:0');
    const button = screen.getByText('Increment');
    expect(currentCount).toHaveTextContent('0');

    fireEvent.click(button);
    expect(currentCount).toHaveTextContent('1');

    fireEvent.click(button);
    expect(currentCount).toHaveTextContent('2');
  });
});

describe('Decrement Counter', () => {
  it('should decrease by 1 when clicking button', () => {
    render(<Counter />, { wrapper: MemoryRouter });

    const currentCount = screen.getByText('Count:0');
    const button = screen.getByText('Decrement');
    expect(currentCount).toHaveTextContent('0');

    fireEvent.click(button);
    expect(currentCount).toHaveTextContent('-1');

    fireEvent.click(button);
    expect(currentCount).toHaveTextContent('-2');
  });
});

describe('Reset Counter', () => {
  it('should reset count when button is clicked', () => {
    render(<Counter />, { wrapper: MemoryRouter });

    const currentCount = screen.getByText('Count:0');
    const button = screen.getByText('Reset');
    expect(currentCount).toHaveTextContent('0');

    fireEvent.click(button);
    expect(currentCount).toHaveTextContent('0');
  });
});
