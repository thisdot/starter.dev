import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GreetingEffects } from './greeting.effects';

describe('GreetingEffects', () => {
  let actions$: Observable<any>;
  let effects: GreetingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GreetingEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(GreetingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
