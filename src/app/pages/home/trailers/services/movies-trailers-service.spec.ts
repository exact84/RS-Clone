import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MoviesTrailersService } from './movies-trailers-service';
import { provideHttpClient } from '@angular/common/http';

describe('MoviesService', () => {
  let service: MoviesTrailersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), MoviesTrailersService],
    });

    service = TestBed.inject(MoviesTrailersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
