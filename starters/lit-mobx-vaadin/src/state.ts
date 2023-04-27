import { action } from 'mobx';

export class StarterState {
  count = 0;

  fetchMessage = '';

  @action
  incrementCount() {
    this.count += 1;
  }

  @action
  decrementCount() {
    this.count -= 1;
  }

  @action
  resetCount() {
    this.count = 0;
  }

  @action
  setFetchMessage(fetchMessage: string) {
    this.fetchMessage = fetchMessage;
  }
}

export const starterState = new StarterState();
