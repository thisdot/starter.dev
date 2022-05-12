import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { FetchExampleService } from '../../fetch-example/fetch-example.service';
import { GreetingEffects } from './greeting.effects';

describe('GreetingEffects', () => {
  let actions$ = new Observable<Action>();
  let effects: GreetingEffects;
  let fetchServiceSpy: jasmine.SpyObj<FetchExampleService>;

  beforeEach(() => {
    fetchServiceSpy = jasmine.createSpyObj('FetchExampleService', ['fetchMessage']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GreetingEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(GreetingEffects);
  });

  it('should dispatch a SUCCESS action with a message', (done: DoneFn) => {
    actions$ = of({ type: '[Greeting API] Get Greeting', greeting: 'angular-ngrx-scss starter.dev!' });
    fetchServiceSpy.fetchMessage.and.returnValue(of('Hello, angular-ngrx-scss starter.dev!'));
    effects.getGreeting$.subscribe((action) => {
      expect(action).toEqual({
        type: '[Greeting API] Get Greeting Success',
        message: 'Hello, angular-ngrx-scss starter.dev!',
      });
    });
    done();
  });
});
