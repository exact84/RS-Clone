import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieSearch } from './movie-search';
import { Router } from '@angular/router';
import { ElementRef, provideZonelessChangeDetection } from '@angular/core';

describe('MovieSearch', () => {
  let component: MovieSearch;
  let fixture: ComponentFixture<MovieSearch>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [MovieSearch],
      providers: [provideZonelessChangeDetection(), { provide: Router, useValue: routerSpy }],
    });

    fixture = TestBed.createComponent(MovieSearch);
    component = fixture.componentInstance;
  });

  it('should focus the input after view init', () => {
    const mockInput = document.createElement('input');
    spyOn(mockInput, 'focus');

    component.searchInput = new ElementRef(mockInput);
    component.ngAfterViewInit();

    expect(mockInput.focus).toHaveBeenCalled();
  });

  it('should navigate with trimmed query on submit', () => {
    component.submitSearch('  inception  ');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movies/search'], {
      queryParams: { query: 'inception' },
    });
  });

  it('should not navigate if query is empty after trim', () => {
    component.submitSearch('   ');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
