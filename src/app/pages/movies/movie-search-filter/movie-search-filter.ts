import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { MovieService } from '../services/movie-service';
import { firstValueFrom } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cardTrailerURL, FALLBACK_POSTER } from '../../../shared/constants/constants';
// import { Spinner } from '../../../shared/ui/spinner/spinner';
import { Router } from '@angular/router';
import { SliderCard } from '../../home/slider-card/slider-card';
import { MovieCard } from '../../models/movie-card';

@Component({
  selector: 'app-movie-search-filter',
  imports: [FormsModule, ReactiveFormsModule, SliderCard],
  templateUrl: './movie-search-filter.html',
  styleUrl: './movie-search-filter.scss',
})
export class MovieSearchFilter implements OnInit {
  movieService = inject(MovieService);
  router = inject(Router);

  readonly searchControl = new FormControl('');
  readonly selectedGenres = signal<number[]>([]);
  readonly selectedYear = signal<number | null>(null);
  readonly selectedLanguage = signal<string | null>(null);
  readonly selectedCountry = signal<string | null>(null);
  readonly genres = signal<{ id: number; name: string }[]>([]);
  readonly languages = signal<{ iso_639_1: string; english_name: string }[]>([]);
  readonly countries = signal<{ iso_3166_1: string; english_name: string }[]>([]);
  readonly selectedRatingMin = signal<number | null>(null);
  readonly selectedRatingMax = signal<number | null>(null);

  genresMap: Record<number, string> = {};

  readonly canSearch = computed(
    () =>
      !!this.searchControl.value?.trim() ||
      !!this.selectedGenres() ||
      !!this.selectedYear() ||
      !!this.selectedLanguage() ||
      !!this.selectedCountry() ||
      !!this.selectedRatingMin() ||
      !!this.selectedRatingMax(),
  );

  readonly movies = signal<MovieCard[]>([]);
  readonly page = signal(1);
  readonly totalPages = signal(0);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  cardURL = cardTrailerURL;
  fallback_poster = FALLBACK_POSTER;

  async ngOnInit() {
    try {
      this.loading.set(true);
      this.error.set(null);
      const [genresResp, langsResp, countriesResp] = await Promise.all([
        firstValueFrom(this.movieService.getGenres()),
        firstValueFrom(this.movieService.getLanguages()),
        firstValueFrom(this.movieService.getCountries()),
      ]);

      this.genres.set(genresResp.genres);
      this.genresMap = Object.fromEntries(genresResp.genres.map((g) => [g.id, g.name]));
      this.languages.set(
        langsResp.map((l) => ({ iso_639_1: l.iso_639_1, english_name: l.english_name })),
      );
      this.countries.set(countriesResp);
    } catch (error) {
      console.error('Error loading filters', error);
      this.error.set('Failed to load filters or movies. Please try again.');
    } finally {
      this.loading.set(false);
    }

    await this.fetchMovies();
  }

  private buildFilters() {
    return {
      ...(this.selectedGenres().length > 0 && {
        with_genres: this.selectedGenres().join(','),
      }),
      ...(this.selectedYear() && { primary_release_year: String(this.selectedYear()) }),
      ...(this.selectedLanguage() && { with_original_language: String(this.selectedLanguage()) }),
      ...(this.selectedCountry() && { with_original_country: String(this.selectedCountry()) }),
      ...(this.selectedRatingMin() && { 'vote_average.gte': String(this.selectedRatingMin()) }),
      ...(this.selectedRatingMax() && { 'vote_average.lte': String(this.selectedRatingMax()) }),
    };
  }

  async fetchMovies() {
    try {
      this.loading.set(true);
      this.error.set(null);
      const queryString = this.searchControl.value?.trim();
      const filtersObject = this.buildFilters();

      let response;
      if (queryString) {
        const keywordResponse = await firstValueFrom(this.movieService.getKeywords(queryString));
        const keywordIds = keywordResponse.results.map((k) => k.id);

        if (keywordIds.length === 0) {
          this.movies.set([]);
          this.totalPages.set(0);
          return;
        }

        response = await firstValueFrom(
          this.movieService.getMoviesByKeywordAndFilters(keywordIds, filtersObject, this.page()),
        );
      } else {
        response = await firstValueFrom(
          this.movieService.getFilteredMovies(filtersObject, this.page()),
        );
      }

      this.movies.set(
        response.results.map((movie) => ({
          ...movie,
          media_type: 'movie',
        })),
      );
      this.totalPages.set(response.total_pages);
    } catch (error) {
      console.error('Error loading movies', error);
      this.error.set('Failed to load movies. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }

  toggleGenre(id: number, checked: boolean) {
    const current = this.selectedGenres();
    this.selectedGenres.set(checked ? [...current, id] : current.filter((g) => g !== id));
  }
}
