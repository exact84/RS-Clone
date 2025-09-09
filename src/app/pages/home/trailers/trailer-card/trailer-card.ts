import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { MovieWithTrailer } from '../../../models/movie-with-trailer';
import { TVWithTrailer } from '../../../models/tv-with-trailer';

@Component({
  selector: 'app-trailer-card',
  imports: [],
  templateUrl: './trailer-card.html',
  styleUrl: './trailer-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrailerCard {
  data = input.required<MovieWithTrailer | TVWithTrailer>();
  trailerClick = output<string>();

  url = 'https://image.tmdb.org/t/p/w500';
  isMovie(data: MovieWithTrailer | TVWithTrailer): data is MovieWithTrailer {
    return 'title' in data;
  }

  readonly loadingState = signal<boolean>(false);
  readonly errorState = signal<boolean>(false);

  get title(): string {
    const value = this.data();
    return this.isMovie(value) ? (value.title ?? 'Untitled') : (value.name ?? 'Untitled');
  }

  get posterUrl(): string {
    const value = this.data();

    const path = this.isMovie(value) ? value.poster_path : (value.poster_path ?? '');

    return path?.trim().length ? `${this.url}${path}` : 'assets/placeholder-movie.png';
  }

  get description(): string {
    const value = this.data();
    return value.overview?.trim() || '';
  }

  emitTrailerClick(): void {
    const value = this.data();
    if (value.trailerKey) {
      this.trailerClick.emit(value.trailerKey);
    }
  }
}
