import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCount from './count/count.reducer';
import { GreetingState, greetingReducer } from './greeting/greeting.reducer';

export interface State {
  count: fromCount.State;
  greeting: GreetingState;
}

export const reducers: ActionReducerMap<State> = { count: fromCount.reducer, greeting: greetingReducer };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
