export interface CounterState {
	counter: number;
}

export const useCounterStore = defineStore('counter', {
	state: (): CounterState => ({
		counter: 0,
	}),
});
