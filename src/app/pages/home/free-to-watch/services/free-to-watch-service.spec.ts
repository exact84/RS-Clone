import { TestBed } from '@angular/core/testing';

import { FreeToWatchService } from './free-to-watch-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockMovies } from '../../../../shared/testing/mocks/movies.mock';
import { mockTv } from '../../../../shared/testing/mocks/tv.mock';

describe('FreeToWatchService', () => {
  let service: FreeToWatchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FreeToWatchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get free movies', () => {
    service.getFreeToWatchByCategory('movies').subscribe((data) => {
      expect(data).toEqual(mockMovies);
      expect(data[0].media_type).toBe('movie');
    });

    const request = httpMock.expectOne(
      (r) =>
        r.url.includes('/discover/movie') &&
        r.params.get('with_watch_monetization_types') === 'free',
    );

    expect(request.request.method).toBe('GET');
    request.flush({ results: mockMovies });
  });

  it('should get free tv shows', () => {
    service.getFreeToWatchByCategory('tv').subscribe((data) => {
      expect(data).toEqual(mockTv);
      expect(data[0].media_type).toBe('tv');
    });

    const request = httpMock.expectOne(
      (r) =>
        r.url.includes('/discover/tv') &&
        r.params.get('with_watch_monetization_types') === 'free' &&
        r.params.get('with_watch_providers') === '9' &&
        r.params.get('watch_region') === 'US',
    );

    expect(request.request.method).toBe('GET');
    request.flush({ results: mockTv });
  });

  it('should fallback to top rated for unknown category', () => {
    service.getFreeToWatchByCategory('unknown').subscribe((data) => {
      expect(data).toEqual(mockMovies);
      expect(data[0].media_type).toBe('movie');
    });

    const request = httpMock.expectOne((r) => r.url.includes('/movie/top_rated'));

    expect(request.request.method).toBe('GET');
    request.flush({ results: mockMovies });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
