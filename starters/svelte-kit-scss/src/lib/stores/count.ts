import { writable } from 'svelte/store';

export const countStore = writable<number>(0);
