import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { TrendingService } from './services/trending-service';
import { ContentCard } from '../../types/content-card';
import { HomeTabs } from '../home-tabs/home-tabs';
import { SliderCard } from '../slider-card/slider-card';
import { CATEGORY_TRENDING } from '../../../shared/constants/constants';
import { Spinner } from '../../../shared/ui/spinner/spinner';

@Component({
  selector: 'app-trending',
  imports: [HomeTabs, SliderCard, Spinner],
  templateUrl: './trending.html',
  styleUrls: ['./trending.scss', '../home.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Trending {
  trendingService = inject(TrendingService);

  readonly loadingState = signal<boolean>(false);
  readonly errorState = signal<boolean>(false);

  readonly categories = signal(CATEGORY_TRENDING);

  readonly selectedCategory = signal<string>('day');
  readonly trendingItems = signal<ContentCard[]>([]);
  readonly trendingCache = signal<Map<string, ContentCard[]>>(new Map());
  readonly categoryClick = signal<string>('day');
  readonly mediaType = signal<'movie' | 'tv'>('movie');

  readonly selectedKey = computed(() => `${this.mediaType()}-${this.selectedCategory()}`);

  constructor() {
    effect(() => {
      const key = this.selectedKey();
      const cached = this.trendingCache().get(key);

      if (cached) {
        this.trendingItems.set(cached);
        this.loadingState.set(false);
        return;
      }

      this.loadingState.set(true);
      this.errorState.set(false);

      this.trendingService.getTrending(this.mediaType(), this.selectedCategory()).subscribe({
        next: (items) => {
          const updated = new Map(this.trendingCache());
          updated.set(key, items);
          this.trendingCache.set(updated);
          this.trendingItems.set(items);
          this.loadingState.set(false);
        },
        error: () => {
          this.trendingItems.set([]);
          this.loadingState.set(false);
          this.errorState.set(true);
        },
      });
    });
  }

  switchCategory(category: string) {
    if (this.selectedCategory() !== category) {
      this.selectedCategory.set(category);
    }
  }
}
