import { render, screen } from '@testing-library/react';
import { NavigationLink } from './NavigationLink';

describe('NavigationLink', () => {
  it('should have a valid label', () => {
    render(<NavigationLink to="/" label="Return Home" />);

    expect(screen.getByText('Return Home')).toBeTruthy();
  });
});
