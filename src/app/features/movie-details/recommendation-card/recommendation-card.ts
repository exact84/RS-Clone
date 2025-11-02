import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { cardTrailerURL, FALLBACK_POSTER } from '../../../shared/constants/constants';
import { DatePipe } from '@angular/common';
import { VotePercentPipe } from '../../../shared/pipes/vote-percent-pipe';
import { RouterLink } from '@angular/router';
import { ContentCard } from '../../../pages/types/content-card';

@Component({
  selector: 'app-recommendation-card',
  imports: [DatePipe, VotePercentPipe, RouterLink],
  templateUrl: './recommendation-card.html',
  styleUrl: './recommendation-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationCard {
  data = input.required<ContentCard>();
  size = input<'sm' | 'md' | 'lg'>('sm');

  get getPosterUrl(): string {
    const value = this.data();
    const path = value.poster_path;
    return path?.trim().length ? `${cardTrailerURL}${path}` : FALLBACK_POSTER;
  }

  getTitle(item: ContentCard): string {
    if ('title' in item) return item.title ?? '';
    if ('name' in item) return item.name ?? '';
    return '';
  }

  getReleaseDate(item: ContentCard): string {
    return 'first_air_date' in item ? (item.first_air_date ?? '') : (item.release_date ?? '');
  }

  scrollToTop() {
    window.scrollTo({ top: 0 });
  }
}
