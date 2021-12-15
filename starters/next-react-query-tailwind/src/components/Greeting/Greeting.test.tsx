import { render, screen } from '@testing-library/react';
import { setupMswServer } from '../../msw/mswServer';
import { createQueryProvider } from '../../utils/mockQueryClient';
import { Greeting } from './Greeting.data';

setupMswServer();

describe('Greeting', () => {
  it('fetches greeting from /api/hello and renders it in a heading', async () => {
    render(<Greeting />, {
      wrapper: createQueryProvider(),
    });

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(await screen.findByText('Hello World!')).toBeVisible();
  });
});
