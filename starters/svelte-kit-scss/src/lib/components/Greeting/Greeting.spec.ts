import Greeting from '$lib/components/Greeting/Greeting.svelte';
import { render } from '@testing-library/svelte';

describe('Greeting Component', () => {
  test('should show title', () => {
    const message = 'from Vitest';
    const { getByText } = render(Greeting, { message });

    expect(() => getByText(`Hello, ${message}`));
  });
});
