import { TestBed } from '@angular/core/testing';
import { PopularMoviesService } from './popular-movies-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContentCard } from '../../../types/content-card';
import { mockMovies } from '../../../../shared/testing/mocks/movies.mock';

describe('PopularMoviesService', () => {
  let service: PopularMoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PopularMoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get data', () => {
    service.getMoviesByGenre(28, 1).subscribe((movies) => {
      console.log('RESPONSE', movies);

      expect(movies).toEqual(mockMovies as ContentCard[]);
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });

    const request = httpMock.expectOne(
      (r) =>
        r.url.includes('/discover/movie') &&
        r.params.get('sort_by') === 'popularity.desc' &&
        r.params.get('language') === 'en-US' &&
        r.params.get('page') === '1' &&
        r.params.get('with_genres') === '28',
    );

    expect(request.request.method).toBe('GET');
    request.flush({ results: mockMovies });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
