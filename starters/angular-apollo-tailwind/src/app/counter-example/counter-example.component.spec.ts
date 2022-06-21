import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    ApolloTestingController,
    ApolloTestingModule,
} from 'apollo-angular/testing';

import { CounterExampleComponent } from './counter-example.component';

describe('CounterExampleComponent', () => {
    let component: CounterExampleComponent;
    let fixture: ComponentFixture<CounterExampleComponent>;
    let controller: ApolloTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CounterExampleComponent],
            imports: [ApolloTestingModule],
        });

        controller = TestBed.inject(ApolloTestingController);
    });

    it('should create the counter component', () => {
        fixture = TestBed.createComponent(CounterExampleComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should increase the counter value', () => {
        fixture = TestBed.createComponent(CounterExampleComponent);
        const app = fixture.componentInstance;
        const expectedCounterValue = app.counter + 1;
        app.increaseCounter();
        expect(app.counter).toBe(expectedCounterValue);
    });

    it('should decrease the counter value', () => {
        fixture = TestBed.createComponent(CounterExampleComponent);
        const app = fixture.componentInstance;
        const expectedCounterValue = app.counter - 1;
        app.decreaseCounter();
        expect(app.counter).toBe(expectedCounterValue);
    });

    it('should reset the counter value', () => {
        fixture = TestBed.createComponent(CounterExampleComponent);
        const app = fixture.componentInstance;
        const expectedCounterValue = 0;
        app.resetCounter();
        expect(app.counter).toBe(expectedCounterValue);
    });
});
