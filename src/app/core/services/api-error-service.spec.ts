import { TestBed } from '@angular/core/testing';

import { ApiErrorService } from './api-error-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ApiErrorService', () => {
  let service: ApiErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ApiErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
