import { writable } from 'svelte/store';

const INITIAL_COUNT = 0;

export const count = writable<number>(INITIAL_COUNT);
export const resetCount = (): void => count.set(INITIAL_COUNT);
export const incrementCount = (): void => count.update((x) => x + 1);
export const decrementCount = (): void => count.update((x) => x - 1);
