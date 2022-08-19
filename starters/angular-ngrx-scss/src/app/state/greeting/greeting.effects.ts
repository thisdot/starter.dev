import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { getGreeting, getGreetingFailure, getGreetingSuccess } from './greeting.actions';
import { FetchExampleService } from 'src/app/fetch-example/fetch-example.service';

@Injectable()
export class GreetingEffects {
  getGreeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getGreeting),
      switchMap((action) =>
        this.fetchExampleService.fetchMessage(action.greeting || '').pipe(
          map((message) => getGreetingSuccess({ message })),
          catchError((error) => {
            console.error(error);
            return of(getGreetingFailure(error));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private fetchExampleService: FetchExampleService) {}
}
