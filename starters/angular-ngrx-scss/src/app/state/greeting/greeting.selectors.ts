import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GreetingState } from './greeting.reducer';

export const getGreetingState = createFeatureSelector<GreetingState>('greeting');

export const greetingMessage = createSelector(getGreetingState, (state: GreetingState) => state?.message);

export const errorMessage = createSelector(getGreetingState, (state: GreetingState) => state?.error);

export const loadingStatus = createSelector(getGreetingState, (state: GreetingState) => state?.isLoading);
