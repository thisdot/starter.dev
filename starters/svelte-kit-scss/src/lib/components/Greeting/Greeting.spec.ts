import Greeting from './Greeting.svelte';
import { render } from '@testing-library/svelte';

describe('Greeting Component', () => {
  test('should show title', () => {
    const message = 'from Vitest';
    const { getByText } = render(Greeting, { message });

    expect(() => getByText(`Hello, ${message}`));
  });
});
