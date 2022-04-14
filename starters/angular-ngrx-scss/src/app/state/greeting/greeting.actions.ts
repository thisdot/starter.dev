import { createAction, props } from '@ngrx/store';

export const getGreeting = createAction('[Greeting] Get Greeting', props<{ greeting: string }>());

export const getGreetingSuccess = createAction('[Greeting] Get Greeting Success', props<{ message: string }>());

export const getGreetingFailure = createAction('[Greeting] Get Greeting Failure', props<{ error: string }>());
