import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('renders Heading', () => {
    render(<Home />);

    const heading = screen.getByText('Next.js 13 App with Zustand and Bulma');
    expect(heading).toBeInTheDocument();
  });
});
