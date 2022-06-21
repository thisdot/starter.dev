import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './count.reducer';

export const getCountState = createFeatureSelector<CounterState>('count');

export const getCount = createSelector(getCountState, (state: CounterState) => state.count);
