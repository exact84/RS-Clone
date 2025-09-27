import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PopularService } from './services/popular-service';
import { ContentCard } from '../../types/content-card';
import { HomeTabs } from '../home-tabs/home-tabs';
import { SliderCard } from '../slider-card/slider-card';
import { CATEGORY_POPULAR } from '../../../shared/constants/constants';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { HorizontalSlider } from '../../../shared/ui/horizontal-slider/horizontal-slider';

@Component({
  selector: 'app-popular',
  imports: [HomeTabs, SliderCard, Spinner, HorizontalSlider],
  templateUrl: './popular.html',
  styleUrls: ['./popular.scss', '../home.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popular {
  private popularService = inject(PopularService);

  categories = signal(CATEGORY_POPULAR);

  readonly loadingState = signal<boolean>(false);
  readonly errorState = signal<boolean>(false);

  readonly selectedCategory = signal<string>('streaming');
  readonly selectedMovies = signal<ContentCard[]>([]);

  readonly moviesCache = signal<Map<string, ContentCard[]>>(new Map());

  constructor() {
    effect(() => {
      const category = this.selectedCategory();
      const cached = this.moviesCache().get(category);

      if (cached) {
        this.selectedMovies.set(cached);
        this.loadingState.set(false);
        return;
      }

      this.loadingState.set(true);
      this.errorState.set(false);

      this.popularService.getPopularByCategory(category).subscribe({
        next: (items) => {
          const updated = new Map(this.moviesCache());
          updated.set(category, items);
          this.moviesCache.set(updated);
          this.selectedMovies.set(items);
          this.loadingState.set(false);
        },
        error: () => {
          this.selectedMovies.set([]);
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
