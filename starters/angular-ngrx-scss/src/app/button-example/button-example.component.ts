import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrementCount, incrementCount, resetCount } from '../state/count/count.actions';
import { getCount } from '../state/count/count.selectors';

@Component({
  selector: 'app-button-example',
  templateUrl: './button-example.component.html',
  styleUrls: ['./button-example.component.scss'],
})
export class ButtonExampleComponent implements OnDestroy {
  count$: Observable<number> = this.store.select(getCount);

  constructor(private readonly store: Store) {}

  ngOnDestroy(): void {
    this.reset();
  }

  increment(): void {
    this.store.dispatch(incrementCount());
  }

  decrement(): void {
    this.store.dispatch(decrementCount());
  }

  reset(): void {
    this.store.dispatch(resetCount());
  }
}
