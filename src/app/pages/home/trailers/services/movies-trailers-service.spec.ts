import { TestBed } from '@angular/core/testing';

import { MoviesTrailersService } from './movies-trailers-service';

describe('MoviesService', () => {
  let service: MoviesTrailersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesTrailersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
