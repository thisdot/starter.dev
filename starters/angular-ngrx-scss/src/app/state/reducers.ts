import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCount from './count/count.reducer';
import * as fromGreeting from './greeting/greeting.reducer';

export interface State {
  count: fromCount.State;
  greeting: fromGreeting.State;
}

export const reducers: ActionReducerMap<State> = { count: fromCount.reducer, greeting: fromGreeting.reducer };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
