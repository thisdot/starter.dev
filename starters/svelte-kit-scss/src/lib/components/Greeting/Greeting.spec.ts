import Greeting from '$lib/components/Greeting/Greeting.svelte';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

describe('Greeting Component', () => {
  test('should show title', () => {
    const message = 'from Vitest';
    render(Greeting, { message });
    const greeting = screen.getByText(`Message: ${message}`);

    expect(greeting).toBeInTheDocument();
  });
});
