import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MovieService } from './movie-service';
// import { MovieBase } from '../../models/movie-base';

describe('Movie', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch()), provideHttpClientTesting()],
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

// {
//   let service: MovieBase = {
//   id: 1,
//   // title?: '',
//   original_title: '',
//   // original_language?: '',
//   overview: '',
//   // poster_path?: '',
//   // backdrop_path?: null,
//   release_date: '',
//   vote_average: 0,
//   vote_count: 0,
//   genre_ids: [1, 2, 3],
// }
