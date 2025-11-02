import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { headersInterceptor } from './headers-interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AUTHORIZATION_KEY } from '../../shared/constants/constants';

describe('headersInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  const interceptor: HttpInterceptorFn = (request, next) =>
    TestBed.runInInjectionContext(() => headersInterceptor(request, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([headersInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should not add authorization header for public endpoints', () => {
    http.get('/auth/login').subscribe();

    const request = httpMock.expectOne('/auth/login');
    expect(request.request.headers.has('authorization')).toBeFalse();
    request.flush({});
  });

  it('should add authorization header for private backend endpoints', () => {
    localStorage.setItem(AUTHORIZATION_KEY, 'test-token');

    http.get('/user/profile').subscribe();

    const request = httpMock.expectOne('/user/profile');
    expect(request.request.headers.get('authorization')).toBe('Bearer test-token');
    request.flush({});
  });

  it('should not add authorization header for non-backend endpoints', () => {
    http.get('/movie/popular').subscribe();

    const request = httpMock.expectOne('/movie/popular');
    expect(request.request.headers.has('authorization')).toBeFalse();
    request.flush({});
  });

  it('should skip header if token is missing', () => {
    http.get('/user/profile').subscribe();

    const request = httpMock.expectOne('/user/profile');
    expect(request.request.headers.has('authorization')).toBeFalse();
    request.flush({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
