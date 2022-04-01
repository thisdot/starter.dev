import { render, screen, fireEvent } from '@testing-library/react';
import { Greeting } from './Greeting';

describe('Greeting', () => {
  it('should show a hello world greeting', async () => {
    const data = "Hello World"
    render(<Greeting message={data} />);

    expect(await screen.findByText(data)).toBeVisible();
    expect(await screen.findByRole('heading')).toHaveTextContent('Hello');
  });
});
