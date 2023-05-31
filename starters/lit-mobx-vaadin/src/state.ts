import { makeAutoObservable } from 'mobx';

export class StarterState {
	count = 0;

	greetingMessage = '';

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

	setGreetingMessage(greetingMessage: string) {
		this.greetingMessage = greetingMessage;
	}
}

export const starterState = new StarterState();
