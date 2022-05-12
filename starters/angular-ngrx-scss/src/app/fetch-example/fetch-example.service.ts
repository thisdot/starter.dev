import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchExampleService {
  fetchMessage(greeting?: string): Observable<string> {
    return this.http
      .get(`https://api.starter.dev/hello?greeting=${greeting}`, {
        responseType: 'text',
      })
      .pipe(
        map((message) => message),
        catchError((error) => {
          console.error(error);
          return 'Sorry, something went wrong. Please try again.';
        })
      );
  }

  constructor(private readonly http: HttpClient) {}
}
