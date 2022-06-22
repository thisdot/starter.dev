import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';

export const GET_GREETING = gql`
    query HelloQuery($greeting: String!) {
        hello(greeting: $greeting)
    }
`;

@Component({
    selector: 'app-fetch-example',
    templateUrl: './fetch-example.component.html',
})
export class FetchExampleComponent implements OnInit {
    private message: string = 'Angular + Apollo + Tailwind starter.dev';
    greetingMessage$!: Observable<any>;

    constructor(private apollo: Apollo) {}

    ngOnInit(): void {
        this.greetingMessage$ = this.getGreetingMessage(this.message);
    }

    getGreetingMessage(message: string): Observable<any> {
        return this.apollo
            .watchQuery<any>({
                query: GET_GREETING,
                variables: {
                    greeting: message,
                },
            })
            .valueChanges.pipe(
                map(({ data }) => data.hello),
                catchError(this.handleError<string>('getGreetingMessage', ''))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log('operation:', operation);

            // send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
