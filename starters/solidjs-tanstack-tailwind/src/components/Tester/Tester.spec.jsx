import { render, screen, fireEvent } from 'solid-testing-library';
import { describe, it, expect } from 'vitest';
import Tester from '.';

describe('Tester component', () => {
  it('should render checkbox and toggle checkbox', async () => {
    await render(() => <Tester />);
    const completed = await screen.findByRole('checkbox');
    expect(completed?.checked).toBe(false);
    fireEvent.click(completed);
    expect(completed?.checked).toBe(true);
  });
});
