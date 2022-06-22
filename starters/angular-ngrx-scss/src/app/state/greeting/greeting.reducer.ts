import { createReducer, on } from '@ngrx/store';
import { getGreeting, getGreetingFailure, getGreetingSuccess } from './greeting.actions';

export const greetingFeatureKey = 'greeting';

export interface GreetingState {
  message: string;
  error: string;
  isLoading: boolean;
}

export const initialState: GreetingState = {
  message: '',
  error: '',
  isLoading: false,
};

export const greetingReducer = createReducer(
  initialState,
  on(getGreeting, (state) => ({ ...state, isLoading: true })),
  on(getGreetingSuccess, (state, { message }) => ({ ...state, message, isLoading: false })),
  on(getGreetingFailure, (state, { error }) => ({ ...state, error, isLoading: false }))
);
