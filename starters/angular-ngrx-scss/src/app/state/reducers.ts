import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { counterReducer, CounterState } from './count/count.reducer';

export interface State {
  count: CounterState;
}

export const reducers: ActionReducerMap<State> = { count: counterReducer };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
