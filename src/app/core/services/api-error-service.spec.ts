import { TestBed } from '@angular/core/testing';

import { ApiErrorService } from './api-error-service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal, WritableSignal } from '@angular/core';
import { throwError } from 'rxjs';

describe('ApiErrorService', () => {
  let service: ApiErrorService;
  let errorSignal: WritableSignal<string | null>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ApiErrorService);
    // service = new ApiErrorService();
    errorSignal = signal<string | null>(null);
  });

  it('should set error message and rethrow error', (done) => {
    const error = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error',
      url: '/api/data',
    });

    const observable$ = throwError(() => error).pipe(
      service.handleApiError(errorSignal, 'DataService'),
    );

    observable$.subscribe({
      error: (error_: HttpErrorResponse) => {
        expect(error_).toBe(error);
        expect(errorSignal()).toBe(
          'DataService: Error 500: Http failure response for /api/data: 500 Internal Server Error',
        );
        done();
      },
    });
  });

  it('should set authorization error message for 401', (done) => {
    const error = new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized',
      url: '/api/secure',
    });

    const observable$ = throwError(() => error).pipe(
      service.handleApiError(errorSignal, 'AuthService'),
    );

    observable$.subscribe({
      error: (error_: HttpErrorResponse) => {
        expect(error_).toBe(error);
        expect(errorSignal()).toBe('AuthService: Authorization error: missing or invalid key');
        done();
      },
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
