import { createAction, props } from '@ngrx/store';

export const getGreeting = createAction('[Greeting API] Get Greeting', props<{ greeting?: string }>());

export const getGreetingSuccess = createAction('[Greeting API] Get Greeting Success', props<{ message: string }>());

export const getGreetingFailure = createAction('[Greeting API] Get Greeting Failure', props<{ error: string }>());
