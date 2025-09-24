import { Component, ElementRef, inject, signal, ViewChild, effect, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MovieStore } from '../services/movie-store-service';
import { SliderCard } from '../../home/slider-card/slider-card';
import { cardTrailerURL, FALLBACK_POSTER } from '../../../shared/constants/constants';

@Component({
  selector: 'app-movie-search-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SliderCard],
  templateUrl: './movie-search-filter.html',
  styleUrls: ['./movie-search-filter.scss'],
})
export class MovieSearchFilter implements OnInit {
  store = inject(MovieStore);

  readonly searchControl = new FormControl('');
  readonly focusSearch = signal<boolean>(false);

  cardURL = cardTrailerURL;
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

  ngOnInit() {
    this.focusSearch.set(true);
  }

  submitSearch() {
    this.store.setSearch(this.searchControl.value ?? '');
    this.store.setPage(1);
    this.store.fetchMovies();
    this.focusSearch.set(true);
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
    this.focusSearch.set(true);
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
