import { expect } from '@open-wc/testing';

import { StarterState, starterState } from './state.js';

describe('state', () => {
  describe('count', () => {
    it('initial state', async () => {
      const state = new StarterState();
      expect(state.count).to.equal(0);
    });
    it('incrementCount', async () => {
      const state = new StarterState();
      expect(state.count).to.equal(0);
      state.incrementCount();
      expect(state.count).to.equal(1);
    });

    it('decrementCount', async () => {
      const state = new StarterState();
      expect(state.count).to.equal(0);
      state.decrementCount();
      expect(state.count).to.equal(-1);
    });

    it('resetCount', async () => {
      const state = new StarterState();
      state.count = 100;
      expect(state.count).to.equal(100);
      state.resetCount();
      expect(state.count).to.equal(0);
    });
  });

  describe('fetch message', () => {
    it('initial state', async () => {
      const state = new StarterState();
      expect(state.fetchMessage).to.equal('');
    });

    it('setFetchMessage', async () => {
      const state = new StarterState();
      expect(state.fetchMessage).to.equal('');
      state.setFetchMessage('Hello');
      expect(state.fetchMessage).to.equal('Hello');
    });
  });

  it('exports state', () => {
    expect(starterState).to.be.instanceOf(StarterState);
  });
});
