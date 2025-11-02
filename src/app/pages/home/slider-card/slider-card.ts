import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ContentCard } from '../../types/content-card';
import { MovieCard } from '../../models/movie-card';
import {
  cardTrailerURL,
  FALLBACK_DATE,
  FALLBACK_TITLE,
  FALLBACK_POSTER,
} from '../../../shared/constants/constants';
import { DatePipe } from '@angular/common';
import { RatingBadge } from '../../../shared/ui/rating-badge/rating-badge';
import { Router } from '@angular/router';
import { FavouritesMenu } from '../../../features/favourites-menu/favourites-menu';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-slider-card',
  imports: [DatePipe, RatingBadge, FavouritesMenu],
  templateUrl: './slider-card.html',
  styleUrl: './slider-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderCard {
  private router = inject(Router);
  private authService = inject(AuthService);
  data = input.required<ContentCard>();

  isAuth = this.authService.authStatus;

  isMovie(data: ContentCard): data is MovieCard {
    return 'title' in data;
  }

  get posterUrl(): string {
    const value = this.data();

    const path = this.isMovie(value) ? value.poster_path : (value.poster_path ?? '');

    return path?.trim().length ? `${cardTrailerURL}${path}` : FALLBACK_POSTER;
  }

  get title(): string {
    const value = this.data();
    return this.isMovie(value) ? (value.title ?? FALLBACK_TITLE) : (value.name ?? FALLBACK_TITLE);
  }

  get vote_average(): number {
    const value = this.data();
    return value.vote_average;
  }

  get date(): string {
    const value = this.data();
    return this.isMovie(value)
      ? (value.release_date ?? FALLBACK_DATE)
      : (value.first_air_date ?? FALLBACK_DATE);
  }

  goToDetails(): void {
    const card = this.data();
    this.router.navigate(['details', card.media_type, card.id]);
  }
}
