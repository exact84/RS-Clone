import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { PopularMoviesService } from './services/popular-movies-service';
import { GenresTabs } from '../genres/genres-tabs/genres-tabs';
import { GenresService } from '../genres/genres-service';
import { Genres } from '../genres/models/genres.interface';
import { ContentCard } from '../../types/content-card';
import { SliderCard } from '../../home/slider-card/slider-card';
import { catchError, EMPTY } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { Button } from '../../../shared/ui/button/button';

@Component({
  selector: 'app-popular-movies',
  imports: [GenresTabs, SliderCard, Spinner, Button],
  templateUrl: './popular-movies.html',
  styleUrls: ['./popular-movies.scss', '../movies.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularMovies {
  private popularMoviesService = inject(PopularMoviesService);
  private genresService = inject(GenresService);
  private destroyRef = inject(DestroyRef);

  readonly genres = signal<Genres[]>([]);
  readonly selectedGenre = signal<number>(0);
  readonly movies = signal<ContentCard[]>([]);

  readonly currentPage = signal(1);
  readonly allPagesLoaded = signal(false);
  readonly scrollAnchor = viewChild('scrollAnchor', { read: ElementRef });

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

      this.popularMoviesService
        .getMoviesByGenre(genreId, page)
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

    effect(() => {
      const anchor = this.scrollAnchor();
      if (!anchor || !this.lazyScrollEnabled()) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.loadNextPage();
        }
      });

      observer.observe(anchor.nativeElement);

      return () => observer.disconnect();
    });
  }

  genreSelected(genreId: number) {
    if (genreId !== this.selectedGenre()) {
      this.currentPage.set(1);
      this.movies.set([]);
      this.allPagesLoaded.set(false);
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
