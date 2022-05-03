import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { HelloService } from './hello.service';

describe('HelloService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let helloService: HelloService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    helloService = new HelloService(httpClientSpy);
  });

  it('should be return hello message', (done: DoneFn) => {
    const expectedHelloMessage: string = "angular-apollo-tailwind starter.dev!"
  
    httpClientSpy.get.and.returnValue(of(expectedHelloMessage));
  
    helloService.getHelloMessage(expectedHelloMessage).subscribe({
      next: helloMessage => {
        expect(helloMessage)
          .withContext('expected hello message')
          .toEqual(`${expectedHelloMessage}`);
          // .toEqual(`Hello, "${expectedHelloMessage}"`);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

});
