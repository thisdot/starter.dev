import { expect, fixture, html } from '@open-wc/testing';

import './fetch.js';
import type { StarterFetch } from './fetch.js';

describe('StarterFetch', () => {
  it('defaults to loading state', async () => {
    const el: StarterFetch = await fixture(html` <td-fetch></td-fetch> `);

    expect(el.shadowRoot?.querySelectorAll('.loader')).to.have.length(1);
  });

  it('shows loading state if message is undefined', async () => {
    const el: StarterFetch = await fixture(html`
      <td-fetch .message=${undefined}></td-fetch>
    `);

    expect(el.shadowRoot?.querySelectorAll('.loader')).to.have.length(1);
  });

  it('shows loading state if message is null', async () => {
    const el: StarterFetch = await fixture(html`
      <td-fetch .message=${null}></td-fetch>
    `);

    expect(el.shadowRoot?.querySelectorAll('.loader')).to.have.length(1);
  });

  it('shows loading state if message is empty string', async () => {
    const el: StarterFetch = await fixture(html`
      <td-fetch .message=${''}></td-fetch>
    `);

    expect(el.shadowRoot?.querySelectorAll('.loader')).to.have.length(1);
  });

  it('shows message if prop is set', async () => {
    const msg = 'Hello World';
    const displayMessage = `Message: ${msg}`;
    const el: StarterFetch = await fixture(html`
      <td-fetch .message=${msg}></td-fetch>
    `);

    const allNodes = el.shadowRoot?.querySelectorAll('*') || [];
    const matchingNodes = Array.from(allNodes).filter(
      node => node.textContent === displayMessage,
    );
    expect(matchingNodes).to.have.length(1);
  });
});
