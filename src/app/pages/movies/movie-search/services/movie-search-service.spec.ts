import { TestBed } from '@angular/core/testing';
import { MovieSearchService } from './movie-search-service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MovieSearchService', () => {
  let service: MovieSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        MovieSearchService,
      ],
    });

    service = TestBed.inject(MovieSearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should call /search/movie with correct params', () => {
    service.getSearchedMovies('matrix', 2).subscribe();

    const request = httpMock.expectOne(
      (r) =>
        r.url.endsWith('/search/movie') &&
        r.urlWithParams.includes('query=matrix') &&
        r.urlWithParams.includes('page=2') &&
        r.urlWithParams.includes('language=en-US'),
    );

    expect(request.request.method).toBe('GET');
    request.flush({ results: [] });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
