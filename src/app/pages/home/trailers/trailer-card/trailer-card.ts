import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MovieWithTrailer } from '../../../models/movie-with-trailer';
import { TVWithTrailer } from '../../../models/tv-with-trailer';
import {
  cardTrailerURL,
  FALLBACK_POSTER,
  FALLBACK_TITLE,
} from '../../../../shared/constants/constants';

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

  isMovie(data: MovieWithTrailer | TVWithTrailer): data is MovieWithTrailer {
    return 'title' in data;
  }

  get title(): string {
    const value = this.data();
    return this.isMovie(value) ? (value.title ?? FALLBACK_TITLE) : (value.name ?? FALLBACK_TITLE);
  }

  get posterUrl(): string {
    const value = this.data();

    const path = this.isMovie(value) ? value.poster_path : (value.poster_path ?? '');

    return path?.trim().length ? `${cardTrailerURL}${path}` : FALLBACK_POSTER;
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
