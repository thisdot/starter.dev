import { createAction } from '@ngrx/store';

export const incrementCount = createAction('[Count] Increment');
export const decrementCount = createAction('[Count] Decrement');
export const resetCount = createAction('[Count] Reset');
