import { render, screen } from 'solid-testing-library';
import { describe, expect, it } from 'vitest';
import { Greeting } from '.';

vi.mock('./GreetingFetcher', () => ({
  default: () => () => Promise.resolve('Hi tester!'),
}));

describe('Greeting', () => {
  it('should mount', async () => {
    const wrapper = await render(() => <Greeting />);
    expect(wrapper).toBeTruthy();
  });

  it('should show the mocked greeting', async () => {
    const wrapper = await render(() => <Greeting />);
    const text = await screen.getByText('Message: Hi tester!');
    expect(text).toBeVisible();
  });
});
