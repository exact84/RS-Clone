import { TestBed } from '@angular/core/testing';
import { PopularMoviesService } from './popular-movies-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContentCard } from '../../../types/content-card';
import { ApiErrorService } from '../../../../core/services/api-error-service';

describe('PopularMoviesService', () => {
  let service: PopularMoviesService;
  let httpMock: HttpTestingController;

  const mockMovies: ContentCard[] = [
    {
      id: 872_585,
      title: 'Oppenheimer',
      original_title: 'Oppenheimer',
      poster_path: '/ptpr0kGAckfQkJeJIt8st5dglHc.jpg',
      genre_ids: [18, 36],
      media_type: 'movie',
      overview:
        'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
      release_date: '2023-07-19',
      vote_average: 8.1,
      vote_count: 7000,
    },
    {
      id: 940_551,
      title: 'The Equalizer 3',
      original_title: 'The Equalizer 3',
      poster_path: '/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg',
      genre_ids: [28, 53],
      media_type: 'movie',
      overview:
        'Robert McCall finds himself at home in Southern Italy, but discovers his friends are under the control of local crime bosses.',
      release_date: '2023-08-30',
      vote_average: 7.3,
      vote_count: 1800,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ApiErrorService],
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
