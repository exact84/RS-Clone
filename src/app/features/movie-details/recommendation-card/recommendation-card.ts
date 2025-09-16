import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MovieCard } from '../../../pages/models/movie-card';
import { cardTrailerURL, FALLBACK_POSTER } from '../../../shared/constants/constants';
import { DatePipe } from '@angular/common';
import { VotePercentPipe } from '../../../shared/pipes/vote-percent-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recommendation-card',
  imports: [DatePipe, VotePercentPipe, RouterLink],
  templateUrl: './recommendation-card.html',
  styleUrl: './recommendation-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationCard {
  data = input.required<MovieCard>();
  size = input<'sm' | 'md' | 'lg'>('sm');

  get getPosterUrl(): string {
    const value = this.data();
    const path = value.poster_path;
    return path?.trim().length ? `${cardTrailerURL}${path}` : FALLBACK_POSTER;
  }

  scrollToTop() {
    window.scrollTo({ top: 0 });
  }
}
