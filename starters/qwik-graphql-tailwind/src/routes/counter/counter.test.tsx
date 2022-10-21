import { render } from '@builder.io/qwik';
import { ElementFixture } from '@builder.io/qwik/testing';
import { describe, expect, it } from 'vitest';
import { Counter } from './counter';

describe('Counter component', function () {
  it('should assert true', async () => {
    // just example test
    expect(true).toBe(true);
  });

  it('should render', async () => {
    const fixture = new ElementFixture();

    await render(fixture.host, <Counter />);

    expect(fixture.host.querySelectorAll('button').length).toBe(3);
    expect(fixture.host.querySelector('h1')?.textContent).toBe('0');
  });

  it('should increment', async () => {
    // Interaction doesn't work at the moment because we don't have a way to trigger an event in the test environment.
    // See https://github.com/BuilderIO/qwik/discussions/1801 for more details.
  });
});
