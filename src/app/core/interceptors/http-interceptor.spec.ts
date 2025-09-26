import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { httpInterceptor } from './http-interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { MockEnvironment } from '../utils/mock-environment.type';

describe('httpInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  const interceptor: HttpInterceptorFn = (request, next) =>
    TestBed.runInInjectionContext(() => httpInterceptor(request, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prepend BASE_URL_BACKEND for backend endpoints', () => {
    http.get('/auth').subscribe();

    const request = httpMock.expectOne(`${environment.BASE_URL_BACKEND}/auth`);
    expect(request.request.method).toBe('GET');
    request.flush({});
  });

  it('should append api_key for TMDB endpoints in dev', () => {
    const mockEnvironment = environment as MockEnvironment;
    mockEnvironment.production = false;
    mockEnvironment.API_KEY = 'mock-key';

    http.get('/movie/popular').subscribe();

    const expectedUrl = `${environment.BASE_URL}/movie/popular?api_key=mock-key`;
    const request = httpMock.expectOne(expectedUrl);
    expect(request.request.method).toBe('GET');
    request.flush({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
