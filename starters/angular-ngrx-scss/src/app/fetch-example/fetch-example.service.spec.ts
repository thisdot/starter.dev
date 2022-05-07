import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { FetchExampleService } from './fetch-example.service';

describe('FetchExampleService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let fetchService: FetchExampleService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    fetchService = new FetchExampleService(httpClientSpy);
  });

  it('should get a message', (done: DoneFn) => {
    // Assemble - my expected final result
    const successfulResponse = 'Hello, angular-ngrx-scss test!';
    // Act - mock the call
    httpClientSpy.get.and.returnValue(of(successfulResponse));
    // Assert - check it's correct
    fetchService.fetchMessage('angular-ngrx-scss test!').subscribe({
      next: (response) => {
        expect(response).toEqual(successfulResponse);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
