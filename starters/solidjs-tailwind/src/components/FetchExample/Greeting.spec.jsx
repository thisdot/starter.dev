import { render, screen } from 'solid-testing-library';
import { describe, expect, it, vi } from 'vitest';

import Greeting from './Greeting';
import greetingFetcher from './GreetingFetcher';

vi.mock('./GreetingFetcher', () => ({
  default: vi.fn(() => () => Promise.resolve('Hi tester!')),
}));

describe('Greeting', () => {
  it('should mount', async () => {
    const wrapper = await render(() => <Greeting />);
    expect(wrapper).toBeTruthy();
  });

  it('should show the mocked greeting', async () => {
    await render(() => <Greeting />);
    const text = await screen.getByText('Message: Hi tester!');
    expect(text).toBeVisible();
  });
  it("should show an error when api doesn't respond", async () => {
    greetingFetcher.mockImplementationOnce(() => () => Promise.reject());
    await render(() => <Greeting />);
    const text = await screen.getByText(
      'There was an error loading your greeting :('
    );
    expect(text).toBeVisible();
  });
});
