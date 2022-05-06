import { createReducer, on } from '@ngrx/store';
import { decrementCount, incrementCount, resetCount } from './count.actions';

export const countFeatureKey = 'count';

export interface CounterState {
  count: number;
}

export const initialState: CounterState = { count: 0 };

export const counterReducer = createReducer(
  initialState,
  on(incrementCount, (state) => ({
    ...state,
    count: state.count + 1,
  })),
  on(decrementCount, (state) => ({
    ...state,
    count: state.count - 1,
  })),
  on(resetCount, (state) => ({
    ...state,
    count: 0,
  }))
);
