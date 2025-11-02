import { Component, ElementRef, inject, ViewChild, effect } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieStore } from './services/movie-store-service';
import { SliderCard } from '../../home/slider-card/slider-card';
import { Spinner } from '../../../shared/ui/spinner/spinner';

@Component({
  selector: 'app-movie-search-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SliderCard, Spinner],
  templateUrl: './movie-search-filter.html',
  styleUrls: ['./movie-search-filter.scss'],
})
export class MovieSearchFilter {
  store = inject(MovieStore);

  canPaginate = this.store.canPaginate;
  canGoBack = this.store.canGoBack;
  canSearch = this.store.canSearch;
  page = this.store.page;
  totalPages = this.store.totalPages;
  error = this.store.error;
  loading = this.store.loading;
  movies = this.store.movies;
  genres = this.store.genres;
  filters = this.store.filters;
  languages = this.store.languages;
  countries = this.store.countries;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      const timeoutId = setTimeout(() => {
        this.searchInput?.nativeElement?.focus();
      });

      return () => {
        clearTimeout(timeoutId);
      };
    });
  }

  submitSearch() {
    this.store.setPage(1);
    this.store.fetchMovies();
    this.searchInput.nativeElement.focus();
  }

  setSearch(value: string) {
    this.store.setSearch(value);
  }

  toggleGenre(id: number, checked: boolean) {
    this.store.toggleGenre(id, checked);
  }
  setYear(year: number | null) {
    this.store.setYear(year);
  }
  setLanguage(lang: string | null) {
    this.store.setLanguage(lang);
  }
  setCountry(country: string | null) {
    this.store.setCountry(country);
  }
  setRatingMin(min: number | null) {
    this.store.setRatingMin(min);
  }
  setRatingMax(max: number | null) {
    this.store.setRatingMax(max);
  }

  resetFilters() {
    this.store.resetFilters();
    this.searchInput.nativeElement.focus();
  }

  prevPage() {
    if (this.store.page() > 1) {
      this.store.setPage(this.store.page() - 1);
      this.store.fetchMovies();
    }
  }

  nextPage() {
    if (this.store.page() < this.store.totalPages()) {
      this.store.setPage(this.store.page() + 1);
      this.store.fetchMovies();
    }
  }

  goToPage() {
    this.store.fetchMovies();
  }

  setPage(page: number) {
    if (page >= 1 && page < this.totalPages()) this.store.setPage(page);
  }

  handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape': {
        this.resetFilters();
        event.preventDefault();
        break;
      }
      case 'ArrowLeft': {
        this.prevPage();
        event.preventDefault();
        break;
      }
      case 'ArrowRight': {
        this.nextPage();
        event.preventDefault();
        break;
      }
    }
  }
}
