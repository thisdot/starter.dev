import { Component } from '@angular/core';
import { counterVar } from './cache';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
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
s;
