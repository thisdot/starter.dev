import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Counter } from './components/Counter';
import { RxJSExample } from './components/RxJS-Example';

test('full app rendering/navigating', () => {
  render(<App />, { wrapper: MemoryRouter });

  expect(
    screen.getByText(
      /Create React App, RxJS and styled-components Starter kit/i
    )
  ).toBeInTheDocument();
});

test('testing rendering/navigating for counter component', () => {
  render(<Counter />, { wrapper: MemoryRouter });

  expect(
    screen.getByText(/Increment, Decrement and Reset Button Examples/i)
  ).toBeInTheDocument();
});

test('testing rendering/navigating for RxJS component', () => {
  render(<RxJSExample />, { wrapper: MemoryRouter });

  expect(screen.getByText(/RxJS Fetch Data from API/i)).toBeInTheDocument();
});
