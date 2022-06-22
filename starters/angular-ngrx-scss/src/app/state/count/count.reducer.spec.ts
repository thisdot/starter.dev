import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { decrementCount, incrementCount, resetCount } from './count.actions';
import { counterReducer, CounterState } from './count.reducer';

const initialState: CounterState = { count: 10 };

describe('Count Reducer', () => {
  let store: MockStore<CounterState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should return the previous state for an unknown action', () => {
    const action = {} as any;
    const result = counterReducer(initialState, action);
    expect(result).toBe(initialState);
  });

  it('should increment the count by 1', () => {
    const action = incrementCount();
    const result = counterReducer(initialState, action);
    expect(result).not.toBe(initialState);
    expect(result.count).toBe(11);
  });

  it('should decrement the count by 1', () => {
    const action = decrementCount();
    const result = counterReducer(initialState, action);
    expect(result).not.toBe(initialState);
    expect(result.count).toBe(9);
  });

  it('should reset the count to 0', () => {
    const action = resetCount();
    const result = counterReducer(initialState, action);
    expect(result).not.toBe(initialState);
    expect(result.count).toBe(0);
  });
});
