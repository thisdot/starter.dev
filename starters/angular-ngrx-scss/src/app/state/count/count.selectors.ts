import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCount from './count.reducer';

export const getCountState = createFeatureSelector<fromCount.State>('count');

export const getCount = createSelector(getCountState, (state: fromCount.State) => {
  console.log(state);
  return state.count;
});
