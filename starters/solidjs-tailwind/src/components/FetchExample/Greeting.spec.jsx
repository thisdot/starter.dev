import { render } from '@solidjs/testing-library';
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
  });
  it('should mount', async () => {
    expect(wrapper).toBeTruthy();
  });

  it('should show the mocked greeting', async () => {
    expect(
      await wrapper.findByText('Hi Learner from This Dot Labs!')
    ).toBeTruthy();
  });
});
