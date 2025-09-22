import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { PopularMoviesService } from './services/popular-movies-service';
import { SPINNER_PATH } from '../../../shared/constants/constants';
import { GenresTabs } from '../genres/genres-tabs/genres-tabs';
import { GenresService } from '../genres/genres-service';
import { Genres } from '../genres/models/genres.interface';
import { ContentCard } from '../../types/content-card';
import { SliderCard } from '../../home/slider-card/slider-card';
import { of, tap, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-popular-movies',
  imports: [GenresTabs, SliderCard],
  templateUrl: './popular-movies.html',
  styleUrls: ['./popular-movies.scss', '../movies.scss'],
})
export class PopularMovies {
  private popularMoviesService = inject(PopularMoviesService);
  private genresService = inject(GenresService);
  private destroyRef = inject(DestroyRef);

  readonly genres = signal<Genres[]>([]);
  readonly selectedGenre = signal<number>(0);
  readonly movies = signal<ContentCard[]>([]);

  readonly isGenresLoading = signal<boolean>(false);
  readonly hasGenresError = signal<boolean>(false);

  readonly isMoviesLoading = signal<boolean>(false);
  readonly hasMoviesError = signal<boolean>(false);

  readonly spinnerPath = SPINNER_PATH;

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
      if (!genreId) return;

      this.popularMoviesService
        .getMoviesByGenre(genreId)
        .pipe(
          takeUntilDestroyed(this.destroyRef), // ← вот здесь ты его используешь
          tap(() => {
            this.isMoviesLoading.set(true);
            this.hasMoviesError.set(false);
          }),
          catchError(() => {
            this.hasMoviesError.set(true);
            this.movies.set([]);
            this.isMoviesLoading.set(false);
            return of([]);
          }),
        )
        .subscribe((items) => {
          this.movies.set(items);
          this.isMoviesLoading.set(false);
        });
    });
  }

  genreSelected(genreId: number) {
    this.selectedGenre.set(genreId);
  }
}
