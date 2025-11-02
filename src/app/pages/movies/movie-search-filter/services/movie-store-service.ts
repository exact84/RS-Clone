import { Injectable, inject, signal, computed, untracked } from '@angular/core';
import { catchError, EMPTY, finalize, forkJoin, of, retry, Subscription, switchMap } from 'rxjs';
import { MovieService } from './movie-service';
import { MovieBase } from '../../../models/movie-base';
import { toSignal } from '@angular/core/rxjs-interop';

type MovieCard = MovieBase & { media_type: 'movie' };

interface Filters {
  search: string;
  genres: number[];
  year: number | null;
  language: string | null;
  country: string | null;
  ratingMin: number | null;
  ratingMax: number | null;
}

const DEFAULT_FILTERS: Filters = {
  search: '',
  genres: [],
  year: null,
  language: null,
  country: null,
  ratingMin: null,
  ratingMax: null,
};

@Injectable({ providedIn: 'root' })
export class MovieStore {
  private readonly movieService = inject(MovieService);

  readonly filters = signal<Filters>({ ...DEFAULT_FILTERS });
  readonly page = signal<number>(1);
  readonly movies = signal<MovieCard[]>([]);
  readonly totalPages = signal<number>(0);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly genresResponse = toSignal(this.movieService.getGenres(), {
    initialValue: { genres: [] } as { genres: { id: number; name: string }[] },
  });
  readonly genres = computed(() => this.genresResponse().genres);

  readonly languages = toSignal(this.movieService.getLanguages(), {
    initialValue: [] as { iso_639_1: string; english_name: string; name: string }[],
  });
  readonly countries = toSignal(this.movieService.getCountries(), {
    initialValue: [] as { iso_3166_1: string; english_name: string }[],
  });
  readonly canPaginate = computed(() => this.page() < this.totalPages());
  readonly canGoBack = computed(() => this.page() > 1);

  readonly canSearch = computed(() => {
    const f = this.filters();
    return !!(
      f.search?.trim() ||
      f.genres.length > 0 ||
      f.year ||
      f.language ||
      f.country ||
      f.ratingMin != null ||
      f.ratingMax != null
    );
  });

  private currentReqSub: Subscription | null = null;

  private readonly LS_KEY = 'movie_filters_RS-clone';

  constructor() {
    const saved = localStorage.getItem(this.LS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<Filters & { page: number }>;
        this.filters.set({ ...DEFAULT_FILTERS, ...parsed });
        if (parsed.page) this.page.set(parsed.page);
      } catch (error) {
        console.warn('Failed to parse saved filters from localStorage', error);
      }
    }
    this.fetchMovies();
  }

  saveFiltersAndPage() {
    localStorage.setItem(this.LS_KEY, JSON.stringify({ ...this.filters(), page: this.page() }));
  }

  fetchMovies() {
    const f = this.filters();
    const p = this.page();

    this.loading.set(true);
    this.error.set(null);

    if (this.currentReqSub) {
      this.currentReqSub.unsubscribe?.();
      this.currentReqSub = null;
    }

    this.saveFiltersAndPage();

    const filtersObject = this.buildFiltersObject(f);
    const search = f.search?.trim();

    const source$ = search?.trim()
      ? forkJoin(
          search
            .trim()
            .split(/\s+/)
            .map((word) => this.movieService.getKeywords(word)),
        ).pipe(
          switchMap((kwResp) => {
            const keywordIds = kwResp.flatMap((r) => r.results.map((k) => k.id));
            if (keywordIds.length === 0) {
              this.movies.set([]);
              this.totalPages.set(0);
              return EMPTY;
            }
            return this.movieService
              .getMoviesByKeywordAndFilters(keywordIds, filtersObject, p)
              .pipe(
                retry({ count: 2, delay: 400 }),
                catchError(() => {
                  this.error.set('Failed to load movies. Please try again.');
                  return of({ results: [], total_pages: 0 });
                }),
              );
          }),
          finalize(() => this.loading.set(false)),
        )
      : this.movieService.getFilteredMovies(filtersObject, p).pipe(
          retry({ count: 2, delay: 400 }),
          catchError(() => {
            this.error.set('Failed to load movies. Please try again.');
            this.loading.set(false);
            return of({ results: [], total_pages: 0 });
          }),
          finalize(() => this.loading.set(false)),
        );

    this.currentReqSub = source$.subscribe({
      next: (resp) => {
        this.movies.set(resp.results.map((m) => ({ ...m, media_type: 'movie' })));
        this.totalPages.set(resp.total_pages);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load movies. Please try again.' + error.message);
        this.loading.set(false);
      },
    });
  }

  private buildFiltersObject(f: Filters): Record<string, string> {
    return untracked(() => {
      // reading signals would create unnecessary dependencies, and Angular would automatically re-invoke the effect whenever the signal changes
      const base: Record<string, string> = {};
      if (f.genres.length > 0) base['with_genres'] = f.genres.join('|');
      if (f.year) base['primary_release_year'] = String(f.year);
      if (f.language) base['with_original_language'] = f.language;
      if (f.country) base['with_origin_country'] = f.country;
      if (f.ratingMin != null) base['vote_average.gte'] = String(f.ratingMin);
      if (f.ratingMax != null) base['vote_average.lte'] = String(f.ratingMax);
      return base;
    });
  }

  setSearch(search: string) {
    this.filters.update((s) => ({ ...s, search }));
  }
  toggleGenre(id: number, checked: boolean) {
    this.filters.update((s) => ({
      ...s,
      genres: checked ? [...s.genres, id] : s.genres.filter((g) => g !== id),
    }));
  }
  setYear(year: number | null) {
    this.filters.update((s) => ({ ...s, year }));
  }
  setLanguage(language: string | null) {
    this.filters.update((s) => ({ ...s, language }));
  }
  setCountry(country: string | null) {
    this.filters.update((s) => ({ ...s, country }));
  }
  setRatingMin(min: number | null) {
    this.filters.update((s) => ({ ...s, ratingMin: min }));
  }
  setRatingMax(max: number | null) {
    this.filters.update((s) => ({ ...s, ratingMax: max }));
  }
  setPage(p: number) {
    this.page.set(p);
  }
  resetFilters() {
    this.filters.set({ ...DEFAULT_FILTERS });
    this.page.set(1);
    this.saveFiltersAndPage();
  }
}
