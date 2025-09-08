import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MoviesTrailersService } from './movies-trailers-service';

describe('MoviesService', () => {
  let service: MoviesTrailersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });

    service = TestBed.inject(MoviesTrailersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
