import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { decrementCount, incrementCount, resetCount } from '../state/count/count.actions';
import { State } from '../state/reducers';
import ButtonComponent from './counter-button/button.component';

import { CounterExampleComponent } from './counter-example.component';

const initialState: State = {
  count: { count: 10 },
  greeting: { message: '', error: '', isLoading: false },
};

describe('CounterExampleComponent', () => {
  let component: CounterExampleComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<CounterExampleComponent>;
  let store: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterExampleComponent, ButtonComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterExampleComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    const count = debugElement.query(By.css('h2'));
    expect(component).toBeTruthy();
    expect(count.nativeElement.textContent).toBe('Count: 10');
  });

  it('should dispatch an increment action when the increment button is tapped', async () => {
    const spy = spyOn(store, 'dispatch');
    const button = debugElement.query(By.css('storybook-button[label="Increment"]'));
    button.triggerEventHandler('onClick', null);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledWith(incrementCount());
  });

  it('should dispatch a decrement action when the decrement button is tapped', async () => {
    const spy = spyOn(store, 'dispatch');
    const button = debugElement.query(By.css('storybook-button[label="Decrement"]'));
    button.triggerEventHandler('onClick', null);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledWith(decrementCount());
  });

  it('should dispatch a reset action when the reset button is tapped', async () => {
    const spy = spyOn(store, 'dispatch');
    const button = debugElement.query(By.css('storybook-button[label="Reset"]'));
    button.triggerEventHandler('onClick', null);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledWith(resetCount());
  });
});
