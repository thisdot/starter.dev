import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const helloURL = 'https://api.starter.dev/hello'

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*' // for dev environment
  }),
};

@Injectable({
  providedIn: 'root'
})
export class HelloService {

  constructor(
    private http: HttpClient
  ) { }

  getHelloMessage(message: string): Observable<any> {
    return this.http.get(`${helloURL}?greeting=${message}`, { ...httpOptions, responseType: 'text' })
    .pipe(
      catchError(this.handleError<any>('getHelloMessage', ''))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

