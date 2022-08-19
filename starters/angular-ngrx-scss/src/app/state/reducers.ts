import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { counterReducer, CounterState } from './count/count.reducer';
import { GreetingState, greetingReducer } from './greeting/greeting.reducer';

export interface State {
  count: CounterState;
  greeting: GreetingState;
}

export const reducers: ActionReducerMap<State> = {
  count: counterReducer,
  greeting: greetingReducer,
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
