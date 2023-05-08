import { makeAutoObservable } from 'mobx';

export class StarterState {
  count = 0;

  fetchMessage = '';

  constructor() {
    makeAutoObservable(this);
  }

  incrementCount() {
    this.count += 1;
  }

  decrementCount() {
    this.count -= 1;
  }

  resetCount() {
    this.count = 0;
  }

  setFetchMessage(fetchMessage: string) {
    this.fetchMessage = fetchMessage;
  }
}

export const starterState = new StarterState();
