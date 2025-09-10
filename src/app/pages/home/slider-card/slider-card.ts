import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContentCard } from '../../types/content-card';
import { MovieCard } from '../../models/movie-card';
import { cardTrailerURL } from '../../../shared/constants/constants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-slider-card',
  imports: [DatePipe],
  templateUrl: './slider-card.html',
  styleUrl: './slider-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderCard {
  data = input.required<ContentCard>();

  isMovie(data: ContentCard): data is MovieCard {
    return 'title' in data;
  }

  get posterUrl(): string {
    const value = this.data();

    const path = this.isMovie(value) ? value.poster_path : (value.poster_path ?? '');

    return path?.trim().length ? `${cardTrailerURL}${path}` : 'assets/placeholder-movie.png';
  }

  get title(): string {
    const value = this.data();
    return this.isMovie(value) ? (value.title ?? 'Untitled') : (value.name ?? 'Untitled');
  }

  get date(): string {
    const value = this.data();
    return this.isMovie(value)
      ? (value.release_date ?? 'No date')
      : (value.first_air_date ?? 'No date');
  }
}
