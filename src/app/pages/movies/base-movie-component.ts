import { signal, DestroyRef, inject, effect, ElementRef, Signal } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ContentCard } from '../types/content-card';
import { GenresService } from './genres/genres-service';
import { Genres } from './genres/models/genres.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export abstract class BaseMovieListComponent {
  protected destroyRef = inject(DestroyRef);
  protected genresService = inject(GenresService);
  readonly genres = signal<Genres[]>([]);
  readonly selectedGenre = signal<number>(0);
  readonly isGenresLoading = signal<boolean>(false);
  readonly hasGenresError = signal<boolean>(false);

  readonly movies = signal<ContentCard[]>([]);
  readonly currentPage = signal(1);

  readonly allPagesLoaded = signal(false);
  readonly isMoviesLoading = signal(false);
  readonly hasMoviesError = signal(false);
  readonly lazyScrollEnabled = signal(false);

  protected scrollAnchorSignal?: Signal<ElementRef | undefined>;

  setScrollAnchorSignal(anchor: Signal<ElementRef | undefined>) {
    this.scrollAnchorSignal = anchor;
    this.setupScrollObserverEffect();
  }

  protected setupScrollObserverEffect(): void {
    effect(() => {
      const anchor = this.scrollAnchorSignal?.();
      if (!anchor || !this.lazyScrollEnabled()) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.loadNextPage();
        }
      });

      observer.observe(anchor.nativeElement);

      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected abstract fetchMovies(genreId: number, page: number): Observable<ContentCard[]>;

  constructor() {
    this.setupGenresEffect();
    this.setupMoviesEffect();
  }

  protected setupGenresEffect(): void {
    effect(() => {
      this.isGenresLoading.set(true);
      this.hasGenresError.set(false);

      this.genresService.getGenres().subscribe({
        next: (items) => {
          this.genres.set(items);
          this.isGenresLoading.set(false);

          if (items.length > 0) {
            this.selectedGenre.set(items[0].id);
          }
        },
        error: () => {
          this.genres.set([]);
          this.isGenresLoading.set(false);
          this.hasGenresError.set(true);
        },
      });
    });
  }

  protected setupMoviesEffect(): void {
    effect(() => {
      const genreId = this.selectedGenre();
      const page = this.currentPage();

      if (this.allPagesLoaded() || !genreId) return;

      this.isMoviesLoading.set(true);
      this.hasMoviesError.set(false);

      this.fetchMovies(genreId, page)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError(() => {
            this.hasMoviesError.set(true);
            this.movies.set([]);
            this.isMoviesLoading.set(false);
            return EMPTY;
          }),
        )
        .subscribe((items) => {
          if (items.length === 0) {
            this.allPagesLoaded.set(true);
          } else {
            this.movies.update((previous) => [...previous, ...items]);
          }
          this.isMoviesLoading.set(false);
        });
    });
  }

  genreSelected(genreId: number) {
    if (genreId !== this.selectedGenre()) {
      this.currentPage.set(1);
      this.movies.set([]);
      this.allPagesLoaded.set(false);
      this.lazyScrollEnabled.set(false);
    }

    this.selectedGenre.set(genreId);
  }

  loadNextPage() {
    if (!this.lazyScrollEnabled() || this.isMoviesLoading() || this.allPagesLoaded()) return;
    this.isMoviesLoading.set(true);
    this.currentPage.update((p) => p + 1);
  }

  enableLazyScroll() {
    this.lazyScrollEnabled.set(true);
    this.loadNextPage();
  }
}
