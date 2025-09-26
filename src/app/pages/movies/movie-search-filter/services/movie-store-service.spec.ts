import { TestBed } from '@angular/core/testing';
import { MovieStore } from './movie-store-service';
import { MovieService } from './movie-service';
import { of, throwError } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { setupZonelessTestEnvironment } from '../../../../../test-setup';

describe('MovieStore', () => {
  let store: MovieStore;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(() => {
    localStorage.removeItem('movie_filters_RS-clone');
    movieServiceSpy = jasmine.createSpyObj('MovieService', [
      'getGenres',
      'getLanguages',
      'getCountries',
      'getKeywords',
      'getMoviesByKeywordAndFilters',
      'getFilteredMovies',
    ]);

    movieServiceSpy.getGenres.and.returnValue(of({ genres: [] }));
    movieServiceSpy.getLanguages.and.returnValue(of([]));
    movieServiceSpy.getCountries.and.returnValue(of([]));
    movieServiceSpy.getKeywords.and.returnValue(of({ results: [] }));
    movieServiceSpy.getFilteredMovies.and.returnValue(
      of({ results: [], page: 1, total_pages: 1, total_results: 0 }),
    );

    setupZonelessTestEnvironment();
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: MovieService, useValue: movieServiceSpy },
        MovieStore,
      ],
    });

    store = TestBed.inject(MovieStore);
  });

  it('should initialize with default filters and page', () => {
    expect(store.filters()).toEqual(jasmine.objectContaining({ search: '', genres: [] }));
    expect(store.page()).toBe(1);
  });

  it('should set search filter', () => {
    store.setSearch('thriller');
    expect(store.filters().search).toBe('thriller');
  });

  it('should toggle genre on and off', () => {
    store.toggleGenre(5, true);
    expect(store.filters().genres).toContain(5);

    store.toggleGenre(5, false);
    expect(store.filters().genres).not.toContain(5);
  });

  it('should reset filters and page', () => {
    store.setSearch('test');
    store.setPage(3);
    store.resetFilters();
    expect(store.filters()).toEqual(jasmine.objectContaining({ search: '', genres: [] }));
    expect(store.page()).toBe(1);
  });

  it('should fetch movies with keywords', () => {
    movieServiceSpy.getKeywords.and.returnValue(of({ results: [{ id: 1, name: 'thriller' }] }));
    movieServiceSpy.getMoviesByKeywordAndFilters.and.returnValue(
      of({ results: [], page: 1, total_pages: 5, total_results: 0 }),
    );

    store.setSearch('thriller');
    store.fetchMovies();

    expect(store.loading()).toBeFalse();
    expect(store.totalPages()).toBe(5);
    expect(store.movies()).toEqual([]);
    expect(store.error()).toBeNull();
  });

  it('should handle empty keyword result', () => {
    movieServiceSpy.getKeywords.and.returnValue(of({ results: [] }));

    store.setSearch('unknown');
    store.fetchMovies();

    expect(store.loading()).toBeFalse();
    expect(store.totalPages()).toBe(0);
    expect(store.movies()).toEqual([]);
  });

  it('should handle error from keyword search', () => {
    movieServiceSpy.getKeywords.and.returnValue(throwError(() => new Error('fail')));

    store.setSearch('error');
    store.fetchMovies();

    expect(store.loading()).toBeFalse();
    expect(store.error()).toContain('Failed to load movies');
  });

  it('should fetch filtered movies when no search', () => {
    movieServiceSpy.getFilteredMovies.and.returnValue(
      of({ results: [], page: 1, total_pages: 3, total_results: 0 }),
    );

    store.setSearch('');
    store.fetchMovies();

    expect(store.totalPages()).toBe(3);
    expect(store.movies()).toEqual([]);
  });
});
