import { render, screen } from 'solid-testing-library';
import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import 'whatwg-fetch';
import { server } from '../../mock/serverSetup';
import Greeting from './Greeting';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Greeting', () => {
  it('should mount', async () => {
    const wrapper = await render(() => <Greeting />);
    expect(wrapper).toBeTruthy();
  });

  it('should show the mocked greeting', async () => {
    await render(() => <Greeting />);
    const text = await screen.findByText('Message: Hi Learner');
    expect(text).toBeVisible();
  });
});
