import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('full app rendering/navigating', () => {
  render(<App />, { wrapper: MemoryRouter });

  expect(
    screen.getByText(
      /Create React App, RxJS and styled-components Starter kit/i
    )
  ).toBeInTheDocument();
});
