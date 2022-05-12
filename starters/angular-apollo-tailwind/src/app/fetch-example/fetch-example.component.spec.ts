import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    ApolloTestingModule,
    ApolloTestingController,
} from 'apollo-angular/testing';
import { FetchExampleComponent, GET_GREETING } from './fetch-example.component';

describe('FetchExampleComponent', () => {
    let component: FetchExampleComponent;
    let fixture: ComponentFixture<FetchExampleComponent>;
    let controller: ApolloTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FetchExampleComponent],
            imports: [ApolloTestingModule],
        });

        controller = TestBed.inject(ApolloTestingController);
    });

    it('should create the fetch component', () => {
        fixture = TestBed.createComponent(FetchExampleComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should be return greeting message', (done: DoneFn) => {
        // Scaffold the component
        fixture = TestBed.createComponent(FetchExampleComponent);
        const app = fixture.componentInstance;

        // Set the greeting message
        const testMessage = 'Angular + Apollo + Tailwind starter.dev';
        const expectedGreetingMessage = `Hello, "${testMessage}"`;

        // Call the relevant method
        app.getGreetingMessage(`Hello, "${testMessage}"`).subscribe((data) => {
            //Make some assertion about the result;
            expect(data).toEqual(expectedGreetingMessage);
            done();
        });

        // The following `expectOne()` will match the operation's document.
        // If no requests or multiple requests matched that document
        // `expectOne()` would throw.
        const op = controller.expectOne(GET_GREETING);

        // Respond with mock data, causing Observable to resolve.
        op.flush({
            data: {
                hello: expectedGreetingMessage,
            },
        });

        // Finally, assert that there are no outstanding operations.
        controller.verify();
    });
});
