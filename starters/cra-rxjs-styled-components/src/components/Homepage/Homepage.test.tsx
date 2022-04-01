import { render, screen } from '@testing-library/react';
import { Homepage } from './Homepage';
import { MemoryRouter } from 'react-router-dom';

test('renders header text on the page', () => {
  render(<Homepage />, { wrapper: MemoryRouter });
  const header = screen.getByText(
    'Create React App, RxJS and styled-components Starter kit'
  );
  expect(header).toBeInTheDocument();
});
