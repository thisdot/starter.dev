import {render, screen, fireEvent } from 'solid-testing-library';
import {describe, it, expect} from 'vitest';
import App from './App';

describe('Timer component', () => {
   it('should render with link to solidjs', async () => {
      await render(() => <App />);
      const link = await screen.findByText('Learn Solid');
      const linkById = await screen.findByTestId('learn-solidjs');
      expect(link).toBeInTheDocument();
      expect(linkById).toBeTruthy();
   });

   it('should render checkbox and toggle checkbox', async () => {
      await render(() => <App />);
      const completed = await screen.findByRole('checkbox');
      expect(completed?.checked).toBe(false);
      fireEvent.click(completed);
      expect(completed?.checked).toBe(true);
   });
});
