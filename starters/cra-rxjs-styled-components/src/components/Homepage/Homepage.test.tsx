import { render, screen } from '@testing-library/react';
import { Homepage } from './Homepage';

test('renders header text on the page', () => {
  render(<Homepage />);
  const header = screen.getByText(
    'Create React App, RxJS and styled-components Starter kit'
  );
  expect(header).toBeInTheDocument();
});
