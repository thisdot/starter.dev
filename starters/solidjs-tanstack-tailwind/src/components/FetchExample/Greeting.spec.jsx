import { render } from 'solid-testing-library';
import { describe, expect, it } from 'vitest';
import { Greeting } from '.';

describe('Greeting', () => {
  it('should mount', async () => {
    const wrapper = await render(() => <Greeting />);
    expect(wrapper).toBeTruthy();
  });
});
