import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { httpInterceptor } from './http-interceptor';

describe('httpInterceptor', () => {
  const interceptor: HttpInterceptorFn = (request, next) =>
    TestBed.runInInjectionContext(() => httpInterceptor(request, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
