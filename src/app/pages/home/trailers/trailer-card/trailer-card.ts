import { Component, input, output } from '@angular/core';
import { MovieWithTrailer } from '../../../models/movie-with-trailer';
import { TVWithTrailer } from '../../../models/tv-with-trailer';

@Component({
  selector: 'app-trailer-card',
  imports: [],
  templateUrl: './trailer-card.html',
  styleUrl: './trailer-card.scss',
})
export class TrailerCard {
  data = input.required<MovieWithTrailer | TVWithTrailer>();
  trailerClick = output<string>();

  isMovie(data: MovieWithTrailer | TVWithTrailer): data is MovieWithTrailer {
    return 'title' in data;
  }

  get title(): string {
    const value = this.data();
    return this.isMovie(value) ? (value.title ?? 'Untitled') : (value.name ?? 'Untitled');
  }

  get posterUrl(): string {
    const value = this.data();

    const path = this.isMovie(value) ? value.poster_path : (value.poster_path ?? ''); // если TVWithTrailer тоже имеет poster_path

    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'assets/placeholder.jpg';
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
