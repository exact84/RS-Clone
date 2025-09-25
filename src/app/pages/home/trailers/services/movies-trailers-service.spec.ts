import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MoviesTrailersService } from './movies-trailers-service';
import { provideHttpClient } from '@angular/common/http';
import { mockMovieCards } from '../../../../shared/testing/mocks/movie-card.mock';
import { mockTVCards } from '../../../../shared/testing/mocks/tv-card.mock';
import { mockTrailerResponse } from '../../../../shared/testing/mocks/trailer-response.mock';

describe('MoviesService', () => {
  let service: MoviesTrailersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(MoviesTrailersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get popular trailers', () => {
    service.getPopularTrailers().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[0].trailerKey).toBe('abc123');
    });

    const discoverRequest = httpMock.expectOne(
      (r) =>
        r.url.includes('/discover/movie') &&
        r.params.get('sort_by') === 'popularity.desc' &&
        r.params.has('primary_release_date.gte') &&
        r.params.has('primary_release_date.lte'),
    );
    expect(discoverRequest.request.method).toBe('GET');
    discoverRequest.flush({ results: mockMovieCards });

    for (const movie of mockMovieCards) {
      const trailerRequest = httpMock.expectOne(`/movie/${movie.id}/videos`);
      expect(trailerRequest.request.method).toBe('GET');
      trailerRequest.flush(mockTrailerResponse);
    }
  });

  it('should get streaming trailers', () => {
    service.getStreamingTrailers().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[1].trailerKey).toBe('abc123');
    });

    const discoverRequest = httpMock.expectOne(
      (r) =>
        r.url.includes('/discover/movie') &&
        r.params.get('with_watch_providers') === '8' &&
        r.params.get('watch_region') === 'US' &&
        r.params.get('with_watch_monetization_types') === 'flatrate',
    );
    expect(discoverRequest.request.method).toBe('GET');
    discoverRequest.flush({ results: mockMovieCards });

    for (const movie of mockMovieCards) {
      const trailerRequest = httpMock.expectOne(`/movie/${movie.id}/videos`);
      trailerRequest.flush(mockTrailerResponse);
    }
  });

  it('should get TV trailers', () => {
    service.getTVTrailers().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[0].trailerKey).toBe('abc123');
    });

    const discoverRequest = httpMock.expectOne(
      (r) =>
        r.url.includes('/discover/tv') &&
        r.params.get('sort_by') === 'popularity.desc' &&
        r.params.get('with_original_language') === 'en' &&
        r.params.get('vote_count.gte') === '50',
    );
    expect(discoverRequest.request.method).toBe('GET');
    discoverRequest.flush({ results: mockTVCards });

    for (const tv of mockTVCards) {
      const trailerRequest = httpMock.expectOne(`/tv/${tv.id}/videos`);
      expect(trailerRequest.request.method).toBe('GET');
      trailerRequest.flush(mockTrailerResponse);
    }
  });

  it('should get for-rent trailers', () => {
    service.getForRentTrailers().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[0].trailerKey).toBe('abc123');
    });

    const discoverRequest = httpMock.expectOne(
      (r) =>
        r.url.includes('/discover/movie') &&
        r.params.get('with_watch_monetization_types') === 'rent' &&
        r.params.get('watch_region') === 'US' &&
        r.params.get('sort_by') === 'primary_release_date.desc',
    );
    expect(discoverRequest.request.method).toBe('GET');
    discoverRequest.flush({ results: mockMovieCards });

    for (const movie of mockMovieCards) {
      const trailerRequest = httpMock.expectOne(`/movie/${movie.id}/videos`);
      trailerRequest.flush(mockTrailerResponse);
    }
  });

  it('should throw error for unknown category', () => {
    service.getTrailersByCategory('unknown').subscribe({
      error: (error) => {
        expect(error.message).toContain('Unknown category');
      },
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
