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

  categories = signal([
    { label: 'Popular', value: 'popular' },
    { label: 'Streaming', value: 'streaming' },
    { label: 'On TV', value: 'on-tv' },
    { label: 'For Rent', value: 'for-rent' },
  ] as const);

  readonly selectedCategory = signal<Category>('popular');
  readonly selectedTrailers = signal<TrailerItem[]>([]);
  readonly posterURL = 'https://image.tmdb.org/t/p/w1280';

  readonly backgroundUrl = computed(() => {
    const firstItem = this.selectedTrailers()[0];
    const posterPath = firstItem?.poster_path;

    return posterPath ? `${this.posterURL}${posterPath}` : null;
  });

  constructor() {
    effect(() => {
      const category = this.selectedCategory();
      this.trailersService.getTrailersByCategory(category).subscribe((items) => {
        this.selectedTrailers.set(items);
      });
    });
  }

  switchCategory(category: Category) {
    this.selectedCategory.set(category);
  }

  openTrailer(key: string): void {
    window.open(`https://www.youtube.com/watch?v=${key}`, '_blank');
  }
}
