import { Component } from '@angular/core';
import { counterVar } from './cache';

@Component({
  selector: 'app-counter-example',
  templateUrl: './counter-example.component.html',
  styleUrls: ['./counter-example.component.scss'],
})
export class CounterExampleComponent {
  get counter() {
    return counterVar();
  }

  increaseCounter() {
    counterVar(counterVar() + 1);
  }

  decreaseCounter() {
    counterVar(counterVar() - 1);
  }

  resetCounter() {
    counterVar(0);
  }
}
