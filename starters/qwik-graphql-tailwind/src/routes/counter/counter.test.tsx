import { render } from '@builder.io/qwik';
import { ElementFixture } from '@builder.io/qwik/testing';
import { describe, expect, it } from 'vitest';
import { Counter } from './counter';

describe('Counter component', function () {
  it('should assert true', async () => {
    expect(true).toBe(true);
  });

  it('should render', async () => {
    const fixture = new ElementFixture();

    await render(fixture.host, <Counter />);

    expect(fixture.host.querySelectorAll('button').length).toBe(3);
    expect(fixture.host.querySelector('h1')?.textContent).toBe('0');
  });

  it('should increment', async () => {
    const fixture = new ElementFixture();

    console.log('before render');
    await render(fixture.host, <Counter />);
    expect(fixture.host.querySelector('h1')?.textContent).toBe('0');

    const btn = fixture.host.querySelectorAll('button')[1];
    btn.click();

    expect(fixture.host.querySelector('h1')?.textContent).toBe('1');
  });
});
