import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
    let component: CounterComponent;
    let fixture: ComponentFixture<CounterComponent>;
    let controller: ApolloTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CounterComponent],
            imports: [ApolloTestingModule],
        });

        controller = TestBed.inject(ApolloTestingController);
    });

    it('should create the counter component', () => {
        fixture = TestBed.createComponent(CounterComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
