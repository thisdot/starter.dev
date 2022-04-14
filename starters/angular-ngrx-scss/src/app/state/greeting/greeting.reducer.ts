import { createReducer, on } from '@ngrx/store';
import { getGreeting, getGreetingFailure, getGreetingSuccess } from './greeting.actions';

export const greetingFeatureKey = 'greeting';

export interface State {
  message?: string | null;
  error?: string | null;
}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,
  on(getGreeting, (state) => ({ ...state, message: null, error: null })),
  on(getGreetingSuccess, (state, { message }) => ({ ...state, message })),
  on(getGreetingFailure, (state, { error }) => ({ ...state, error }))
);
