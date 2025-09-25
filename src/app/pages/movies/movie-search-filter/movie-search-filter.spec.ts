import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieSearchFilter } from './movie-search-filter';
import { MovieStore } from '../services/movie-store-service';
import { MovieService } from '../services/movie-service';
import { provideZonelessChangeDetection } from '@angular/core';
import { setupZonelessTestEnvironment } from '../../../../test-setup';
import { of } from 'rxjs';

describe('MovieSearchFilter', () => {
  setupZonelessTestEnvironment();

  let fixture: ComponentFixture<MovieSearchFilter>;
  let component: MovieSearchFilter;
  let store: MovieStore;

  beforeEach(() => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', [
      'getGenres',
      'getLanguages',
      'getCountries',
      'getKeywords',
      'getMoviesByKeywordAndFilters',
      'getFilteredMovies',
    ]);

    movieServiceSpy.getGenres.and.returnValue(of({ genres: [{ id: 1, name: 'Action' }] }));
    movieServiceSpy.getLanguages.and.returnValue(of([]));
    movieServiceSpy.getCountries.and.returnValue(of([]));
    movieServiceSpy.getKeywords.and.returnValue(of({ results: [] }));
    movieServiceSpy.getFilteredMovies.and.returnValue(of({ results: [], total_pages: 0 }));

    TestBed.configureTestingModule({
      imports: [MovieSearchFilter],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MovieService, useValue: movieServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(MovieSearchFilter);
    component = fixture.componentInstance;
    store = TestBed.inject(MovieStore);
    fixture.detectChanges();
  });

  it('should submit search and fetch movies', () => {
    spyOn(store, 'setSearch');
    spyOn(store, 'setPage');
    spyOn(store, 'fetchMovies');

    component.searchControl.setValue('thriller');
    component.submitSearch();

    expect(store.setSearch).toHaveBeenCalledWith('thriller');
    expect(store.setPage).toHaveBeenCalledWith(1);
    expect(store.fetchMovies).toHaveBeenCalled();
  });

  it('should go to previous page and fetch movies', () => {
    spyOn(store, 'page').and.returnValue(3);
    spyOn(store, 'setPage');
    spyOn(store, 'fetchMovies');

    component.prevPage();

    expect(store.setPage).toHaveBeenCalledWith(2);
    expect(store.fetchMovies).toHaveBeenCalled();
  });

  it('should not go to previous page if already on first', () => {
    spyOn(store, 'page').and.returnValue(1);
    spyOn(store, 'setPage');
    spyOn(store, 'fetchMovies');

    component.prevPage();

    expect(store.setPage).not.toHaveBeenCalled();
    expect(store.fetchMovies).not.toHaveBeenCalled();
  });

  it('should go to next page and fetch movies', () => {
    spyOn(store, 'page').and.returnValue(2);
    spyOn(store, 'totalPages').and.returnValue(3);
    spyOn(store, 'setPage');
    spyOn(store, 'fetchMovies');

    component.nextPage();

    expect(store.setPage).toHaveBeenCalledWith(3);
    expect(store.fetchMovies).toHaveBeenCalled();
  });

  it('should not go to next page if already on last', () => {
    spyOn(store, 'page').and.returnValue(5);
    spyOn(store, 'totalPages').and.returnValue(5);
    spyOn(store, 'setPage');
    spyOn(store, 'fetchMovies');

    component.nextPage();

    expect(store.setPage).not.toHaveBeenCalled();
    expect(store.fetchMovies).not.toHaveBeenCalled();
  });

  it('should toggle genre', () => {
    spyOn(store, 'toggleGenre');
    component.toggleGenre(7, true);
    expect(store.toggleGenre).toHaveBeenCalledWith(7, true);
  });

  it('should set year, language, country, ratingMin, ratingMax', () => {
    spyOn(store, 'setYear');
    spyOn(store, 'setLanguage');
    spyOn(store, 'setCountry');
    spyOn(store, 'setRatingMin');
    spyOn(store, 'setRatingMax');

    component.setYear(2020);
    component.setLanguage('en');
    component.setCountry('US');
    component.setRatingMin(5);
    component.setRatingMax(9);

    expect(store.setYear).toHaveBeenCalledWith(2020);
    expect(store.setLanguage).toHaveBeenCalledWith('en');
    expect(store.setCountry).toHaveBeenCalledWith('US');
    expect(store.setRatingMin).toHaveBeenCalledWith(5);
    expect(store.setRatingMax).toHaveBeenCalledWith(9);
  });

  it('should reset filters and focus search', () => {
    spyOn(store, 'resetFilters');
    component.resetFilters();
    expect(store.resetFilters).toHaveBeenCalled();
    expect(component.focusSearch()).toBeTrue();
  });
});
