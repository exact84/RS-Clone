import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie-service';
import { provideZonelessChangeDetection } from '@angular/core';
import { setupZonelessTestEnvironment } from '../../../../../test-setup';

describe('MovieService (standalone)', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    setupZonelessTestEnvironment();
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        MovieService,
      ],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch genres', () => {
    service.getGenres().subscribe((response) => {
      expect(response.genres).toEqual([]);
    });

    const request = httpMock.expectOne(
      (r) => r.url === '/genre/movie/list' && r.params.get('language') === 'en-US',
    );
    expect(request.request.method).toBe('GET');
    request.flush({ genres: [] });
  });

  it('should fetch keywords by query', () => {
    const query = 'action';
    service.getKeywords(query).subscribe((response) => {
      expect(response.results).toEqual([]);
    });

    const request = httpMock.expectOne(
      (r) =>
        r.url === '/search/keyword' &&
        r.params.get('query') === query &&
        r.params.get('language') === 'en-US',
    );
    expect(request.request.method).toBe('GET');
    request.flush({ results: [] });
  });

  it('should fetch languages', () => {
    service.getLanguages().subscribe((response) => {
      expect(response).toEqual([]);
    });

    const request = httpMock.expectOne((r) => r.url === '/configuration/languages');
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('should fetch countries', () => {
    service.getCountries().subscribe((response) => {
      expect(response).toEqual([]);
    });

    const request = httpMock.expectOne((r) => r.url === '/configuration/countries');
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('should fetch movies by keyword and filters', () => {
    const keywordIds = [1, 2];
    const filters = { year: '2020' };
    const page = 3;

    service.getMoviesByKeywordAndFilters(keywordIds, filters, page).subscribe((response) => {
      expect(response.results).toEqual([]);
      expect(response.page).toBe(page);
    });

    const request = httpMock.expectOne(
      (r) =>
        r.url === '/discover/movie' &&
        r.params.get('with_keywords') === '1|2' &&
        r.params.get('year') === '2020' &&
        r.params.get('page') === String(page) &&
        r.params.get('language') === 'en-US',
    );
    expect(request.request.method).toBe('GET');
    request.flush({ results: [], page, total_pages: 0, total_results: 0 });
  });

  it('should fetch filtered movies', () => {
    const filters = { sort_by: 'popularity.desc' };
    const page = 2;

    service.getFilteredMovies(filters, page).subscribe((response) => {
      expect(response.results).toEqual([]);
      expect(response.page).toBe(page);
    });

    const request = httpMock.expectOne(
      (r) =>
        r.url === '/discover/movie' &&
        r.params.get('sort_by') === 'popularity.desc' &&
        r.params.get('page') === String(page) &&
        r.params.get('language') === 'en-US',
    );
    expect(request.request.method).toBe('GET');
    request.flush({ results: [], page, total_pages: 0, total_results: 0 });
  });

  it('should fetch movies with empty keywordIds', () => {
    const filters = { year: '2020' };
    service.getMoviesByKeywordAndFilters([], filters).subscribe((response) => {
      expect(response.results).toEqual([]);
    });

    const request = httpMock.expectOne(
      (r) =>
        r.url === '/discover/movie' &&
        !r.params.has('with_keywords') &&
        r.params.get('year') === '2020',
    );
    expect(request.request.method).toBe('GET');
    request.flush({ results: [], page: 1, total_pages: 0, total_results: 0 });
  });

  it('should fetch filtered movies with empty filters', () => {
    service.getFilteredMovies({}).subscribe((response) => {
      expect(response.results).toEqual([]);
    });

    const request = httpMock.expectOne(
      (r) =>
        r.url === '/discover/movie' &&
        r.params.get('language') === 'en-US' &&
        r.params.get('page') === '1',
    );
    expect(request.request.method).toBe('GET');
    request.flush({ results: [], page: 1, total_pages: 0, total_results: 0 });
  });

  it('should handle error when fetching genres', () => {
    service.getGenres().subscribe({
      next: () => fail('Expected error, but got success'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const request = httpMock.expectOne(
      (r) => r.url === '/genre/movie/list' && r.params.get('language') === 'en-US',
    );
    request.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });
});
