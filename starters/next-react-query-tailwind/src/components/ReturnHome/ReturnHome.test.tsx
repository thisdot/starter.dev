import { render, screen } from '@testing-library/react';
import { ReturnHome } from './ReturnHome';

describe('ReturnHome', () => {
  it('should have valid label', () => {
    render(<ReturnHome />);

    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Return Home');   
  });
});
