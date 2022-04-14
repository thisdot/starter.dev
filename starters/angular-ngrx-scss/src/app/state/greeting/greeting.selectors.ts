import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './greeting.reducer';

export const getGreetingState = createFeatureSelector<State>('greeting');

export const getGreeting = createSelector(getGreetingState, (state: State) => state.message);
