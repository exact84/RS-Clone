import { Component, DestroyRef, effect, inject, signal, viewChild } from '@angular/core';
import { ContentCard } from '../../types/content-card';
import { NowPlayingService } from './services/now-playing-service';
import { GenresService } from '../genres/genres-service';
import { Genres } from '../genres/models/genres.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY } from 'rxjs';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { SliderCard } from '../../home/slider-card/slider-card';
import { GenresTabs } from '../genres/genres-tabs/genres-tabs';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-now-playing',
  imports: [Spinner, SliderCard, GenresTabs, ScrollingModule, CdkFixedSizeVirtualScroll],
  templateUrl: './now-playing.html',
  styleUrl: './now-playing.scss',
})
export class NowPlaying {
  readonly nowPlayingService = inject(NowPlayingService);
  private genresService = inject(GenresService);
  private destroyRef = inject(DestroyRef);
  readonly movies = signal<ContentCard[]>([]);
  readonly totalPages = signal(1);
  readonly isLoading = signal(false);
  readonly genres = signal<Genres[]>([]);
  readonly selectedGenre = signal<number>(0);
  readonly currentPage = signal(1);
  readonly allPagesLoaded = signal(false);
  readonly scrollAnchor = viewChild(CdkVirtualScrollViewport);

  readonly isGenresLoading = signal<boolean>(false);
  readonly hasGenresError = signal<boolean>(false);

  readonly isMoviesLoading = signal<boolean>(false);
  readonly hasMoviesError = signal<boolean>(false);

  readonly lazyScrollEnabled = signal(false);

  constructor() {
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

    effect(() => {
      const genreId = this.selectedGenre();
      const page = this.currentPage();

      if (this.allPagesLoaded() || !genreId) return;

      this.isMoviesLoading.set(true);
      this.hasMoviesError.set(false);

      this.nowPlayingService
        .getNowPlayingByGenre(genreId, page)
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
    this.selectedGenre.set(genreId);
    if (genreId !== this.selectedGenre()) {
      this.currentPage.set(1);
      this.movies.set([]);
      this.allPagesLoaded.set(false);
      this.lazyScrollEnabled.set(false);
      this.scrollAnchor()?.scrollToIndex(0);
    }
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

  onScrolledIndexChange(index: number) {
    const threshold = this.movies().length - 10;
    const nextPage = this.currentPage() + 1;

    if (
      index > threshold &&
      nextPage <= this.totalPages() &&
      !this.isMoviesLoading() &&
      !this.allPagesLoaded() &&
      this.lazyScrollEnabled()
    ) {
      this.currentPage.set(nextPage);
    }
  }
}
