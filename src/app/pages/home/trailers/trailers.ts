import {
  Component,
  computed,
  inject,
  signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MoviesTrailersService } from './services/movies-trailers-service';

import { CommonModule, TitleCasePipe } from '@angular/common';
import { TrailerCard } from './trailer-card/trailer-card';

import { TrailerItem } from '../../types/trailer-item';

import { Category } from '../../types/category';

@Component({
  selector: 'app-trailers',
  imports: [TitleCasePipe, TrailerCard, CommonModule],
  templateUrl: './trailers.html',
  styleUrls: ['./trailers.scss', '../home.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Trailers {
  trailersService = inject(MoviesTrailersService);
  readonly loadingState = signal<boolean>(false);
  readonly errorState = signal<boolean>(false);

  categories = signal([
    { label: 'Popular', value: 'popular' },
    { label: 'Streaming', value: 'streaming' },
    { label: 'On TV', value: 'on-tv' },
    { label: 'For Rent', value: 'for-rent' },
  ] as const);

  readonly selectedCategory = signal<Category>('popular');
  readonly selectedTrailers = signal<TrailerItem[]>([]);
  readonly posterURL = 'https://image.tmdb.org/t/p/w1280';
  readonly youtubeWatchUrl = 'https://www.youtube.com/watch?v=';

  readonly backgroundUrl = computed(() => {
    const firstItem = this.selectedTrailers()[0];
    const posterPath = firstItem?.poster_path;

    return posterPath ? `${this.posterURL}${posterPath}` : null;
  });

  constructor() {
    effect(() => {
      const category = this.selectedCategory();
      this.loadingState.set(true);
      this.errorState.set(false);

      this.trailersService.getTrailersByCategory(category).subscribe({
        next: (items) => {
          this.selectedTrailers.set(items);
          this.loadingState.set(false);
        },
        error: () => {
          this.selectedTrailers.set([]);
          this.loadingState.set(false);
          this.errorState.set(true);
        },
      });
    });
  }

  switchCategory(category: Category) {
    if (this.selectedCategory() !== category) {
      this.selectedCategory.set(category);
    }
  }

  openTrailer(key: string): void {
    if (key) {
      window.open(`${this.youtubeWatchUrl}${key}`, '_blank');
    }
  }
}
