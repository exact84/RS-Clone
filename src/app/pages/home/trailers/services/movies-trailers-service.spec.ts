import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MoviesTrailersService } from './movies-trailers-service';
import { headersInterceptor } from '../../../../core/interceptors/headers-interceptor';
import { httpInterceptor } from '../../../../core/interceptors/http-interceptor';

describe('MoviesService', () => {
  let service: MoviesTrailersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpInterceptor, headersInterceptor])),
        provideHttpClientTesting(),
        MoviesTrailersService,
      ],
    });

    service = TestBed.inject(MoviesTrailersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
