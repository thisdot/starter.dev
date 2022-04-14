import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './count.reducer';

export const getCountState = createFeatureSelector<State>('count');

export const getCount = createSelector(getCountState, (state: State) => state.count);
