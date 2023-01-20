import { render } from 'solid-testing-library';
import {
  describe,
  expect,
  it,
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
} from 'vitest';
import 'whatwg-fetch';
import { server } from '../../mock/serverSetup';
import { Greeting } from '.';
import { Router } from '@solidjs/router';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Greeting', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(() => (
      <Router>
        <Greeting />
      </Router>
    ));

    window.fetch = () => {
      return new Promise((resolve) => {
        resolve({
          json: () => {
            return new Promise((resolve) => {
              resolve({
                results: {
                  text: () => 'daian',
                },
              });
            });
          },
        });
      });
    };
  });
  it('should mount', async () => {
    expect(wrapper).toBeTruthy();
  });

  it('should show the mocked greeting', async () => {
    const text = await screen.findByText('Hi Learner from This Dot Labs!');
    expect(text).toBeVisible();
  });
});
