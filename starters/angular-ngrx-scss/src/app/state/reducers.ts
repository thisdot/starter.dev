import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCount from './count/count.reducer';

export interface State {
  count: fromCount.State;
}

export const reducers: ActionReducerMap<State> = { count: fromCount.reducer };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
