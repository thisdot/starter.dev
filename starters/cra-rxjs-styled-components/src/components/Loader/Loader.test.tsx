import { render, screen, fireEvent } from '@testing-library/react';
import { Loader } from './Loader';
import { MemoryRouter } from 'react-router-dom';

describe('Add Loader', () => {
  it('should appear while waiting for response', () => {
    const { container } = render(<Loader />, { wrapper: MemoryRouter });
    expect(container.getElementsByClassName('w-60').length).toBe(1);
  });
});
