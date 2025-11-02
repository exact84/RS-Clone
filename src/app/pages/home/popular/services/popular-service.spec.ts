import { TestBed } from '@angular/core/testing';

import { PopularService } from './popular-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockMovies } from '../../../../shared/testing/mocks/movies.mock';
import { mockTv } from '../../../../shared/testing/mocks/tv.mock';

describe('PopularService', () => {
  let service: PopularService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PopularService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get popular streaming movies', () => {
    service.getPopularByCategory('streaming').subscribe((data) => {
      expect(data).toEqual(mockMovies);
      expect(data[0].media_type).toBe('movie');
    });

    const request = httpMock.expectOne(
      (r) =>
        r.url.includes('/discover/movie') &&
        r.params.get('sort_by') === 'popularity.desc' &&
        r.params.has('primary_release_date.gte') &&
        r.params.has('primary_release_date.lte') &&
        r.params.get('with_watch_providers') === '8' &&
        r.params.get('watch_region') === 'US',
    );

    expect(request.request.method).toBe('GET');
    request.flush({ results: mockMovies });
  });

  it('should get popular on-tv shows', () => {
    service.getPopularByCategory('on-tv').subscribe((data) => {
      expect(data).toEqual(mockTv);
      expect(data[0].media_type).toBe('tv');
    });

    const request = httpMock.expectOne(
      (r) =>
        r.url.includes('/discover/tv') &&
        r.params.get('sort_by') === 'popularity.desc' &&
        r.params.has('primary_release_date.gte') &&
        r.params.has('primary_release_date.lte') &&
        r.params.get('with_watch_providers') === '9' &&
        r.params.get('watch_region') === 'US',
    );

    expect(request.request.method).toBe('GET');
    request.flush({ results: mockTv });
  });

  it('should get popular for-rent movies', () => {
    service.getPopularByCategory('for-rent').subscribe((data) => {
      expect(data).toEqual(mockMovies);
      expect(data[0].media_type).toBe('movie');
    });

    const request = httpMock.expectOne(
      (r) =>
        r.url.includes('/discover/movie') &&
        r.params.get('sort_by') === 'popularity.desc' &&
        r.params.has('primary_release_date.gte') &&
        r.params.has('primary_release_date.lte') &&
        r.params.get('with_release_type') === '3',
    );

    expect(request.request.method).toBe('GET');
    request.flush({ results: mockMovies });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
