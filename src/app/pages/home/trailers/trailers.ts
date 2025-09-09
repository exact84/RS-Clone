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
import { posterURL, youtubeWatchUrl } from '../../../shared/constants/constants';

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

  readonly trailersCache = signal<Map<Category, TrailerItem[]>>(new Map());

  readonly backgroundUrl = computed(() => {
    const firstItem = this.selectedTrailers()[0];
    const posterPath = firstItem?.poster_path;

    return posterPath ? `${posterURL}${posterPath}` : null;
  });

  constructor() {
    effect(() => {
      const category = this.selectedCategory();
      const cached = this.trailersCache().get(category);

      if (cached) {
        this.selectedTrailers.set(cached);
        this.loadingState.set(false);
        return;
      }

      this.loadingState.set(true);
      this.errorState.set(false);

      this.trailersService.getTrailersByCategory(category).subscribe({
        next: (items) => {
          const updated = new Map(this.trailersCache());
          updated.set(category, items);
          this.trailersCache.set(updated);

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
      this.loadingState.set(true);
      this.errorState.set(false);
    }
  }

  openTrailer(key: string): void {
    if (key) {
      window.open(`${youtubeWatchUrl}${key}`, '_blank');
    }
  }
}
