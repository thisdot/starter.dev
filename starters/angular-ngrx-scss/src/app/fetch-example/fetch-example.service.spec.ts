import { TestBed } from '@angular/core/testing';

import { FetchExampleService } from './fetch-example.service';

describe('FetchExampleService', () => {
  let service: FetchExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
