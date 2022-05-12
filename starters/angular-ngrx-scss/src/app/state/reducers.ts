import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { GreetingState, greetingReducer } from './greeting/greeting.reducer';

export interface State {
  greeting: GreetingState;
}

export const reducers: ActionReducerMap<State> = { greeting: greetingReducer };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
