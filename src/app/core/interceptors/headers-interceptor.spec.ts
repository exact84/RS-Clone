import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { headersInterceptor } from './headers-interceptor';

describe('headersInterceptor', () => {
  const interceptor: HttpInterceptorFn = (request, next) =>
    TestBed.runInInjectionContext(() => headersInterceptor(request, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
