import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieSearch } from './movie-search';
import { MovieSearchService } from './services/movie-search-service';
import { provideZonelessChangeDetection } from '@angular/core';
import { of, throwError } from 'rxjs';
import { ElementRef } from '@angular/core';
import { MovieResponse } from '../../models/movie-response';

describe('MovieSearch', () => {
  let fixture: ComponentFixture<MovieSearch>;
  let component: MovieSearch;
  let mockService: jasmine.SpyObj<MovieSearchService>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('MovieSearchService', ['getSearchedMovies']);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: MovieSearchService, useValue: mockService },
      ],
      imports: [MovieSearch],
    });

    fixture = TestBed.createComponent(MovieSearch);
    component = fixture.componentInstance;
  });

  it('should focus input after view init', () => {
    const input = document.createElement('input');
    spyOn(input, 'focus');
    component.searchInput = new ElementRef(input);

    component.ngAfterViewInit();

    expect(input.focus).toHaveBeenCalled();
  });

  it('should call service and set movies on success', () => {
    const mockResponse: MovieResponse = {
      results: [
        {
          id: 1,
          title: 'Test Movie',
          original_title: 'Test Movie Original',
          poster_path: '/test.jpg',
          overview: 'Test overview',
          release_date: '2025-09-09',
          vote_average: 8.5,
          vote_count: 100,
          media_type: 'movie',
        },
      ],
      page: 1,
      total_pages: 1,
      total_results: 1,
    };

    mockService.getSearchedMovies.and.returnValue(of(mockResponse));

    component.submitSearch('test');

    expect(mockService.getSearchedMovies).toHaveBeenCalledWith('test');
    expect(component.movies().length).toBe(1);
    expect(component.loadingState()).toBeFalse();
    expect(component.errorState()).toBeNull();
  });

  it('should set errorState on service failure', () => {
    mockService.getSearchedMovies.and.returnValue(throwError(() => new Error('fail')));

    component.submitSearch('fail');

    expect(component.movies()).toEqual([]);
    expect(component.loadingState()).toBeFalse();
    expect(component.errorState()).toBe('Failed to load movies. Please try again.');
  });

  it('should not call service if query is empty', () => {
    component.submitSearch('');
    expect(mockService.getSearchedMovies).not.toHaveBeenCalled();
  });

  it('should auto-submit if query input is provided', () => {
    component.query = 'auto';
    mockService.getSearchedMovies.and.returnValue(
      of({ page: 0, total_pages: 0, total_results: 0, results: [] }),
    );

    component.ngOnInit();

    expect(mockService.getSearchedMovies).toHaveBeenCalledWith('auto');
  });
});
