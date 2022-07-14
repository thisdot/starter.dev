import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';
import { MemoryRouter } from 'react-router-dom';

describe('Add Loader', () => {
  it('should appear while waiting for response', () => {
    const { getByTestId } = render(<Loader />, { wrapper: MemoryRouter });
    expect(getByTestId('loader')).toBeVisible();
  });
});
