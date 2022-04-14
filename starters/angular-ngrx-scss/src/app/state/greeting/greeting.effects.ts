import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getGreeting, getGreetingFailure, getGreetingSuccess } from './greeting.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class GreetingEffects {
  getGreeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getGreeting),
      switchMap((action) =>
        this.http
          .get('https://api.starter.dev/hello', {
            responseType: 'text',
            params: { greeting: action.greeting },
          })
          .pipe(
            map((message) => getGreetingSuccess({ message })),
            catchError((error) => {
              console.error(error);
              return of(getGreetingFailure(error));
            })
          )
      )
    )
  );

  constructor(private actions$: Actions, private readonly http: HttpClient) {}
}
