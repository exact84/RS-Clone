import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieStore } from '../services/movie-store-service';
import { SliderCard } from '../../home/slider-card/slider-card';
import { FALLBACK_POSTER } from '../../../shared/constants/constants';
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

  readonly searchControl = new FormControl('');

  fallback_poster = FALLBACK_POSTER;

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
    this.store.setSearch(this.searchControl.value ?? '');
    this.store.setPage(1);
    this.store.fetchMovies();
  }

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
  }

  goToPage() {
    this.store.fetchMovies();
  }

  setPage(page: number) {
    if (page >= 1 && page < this.totalPages()) this.store.setPage(page);
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
}
