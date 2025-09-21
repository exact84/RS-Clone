import { ContentDetails } from '../../../pages/types/content-details';
import {
  cardTrailerURL,
  FALLBACK_POSTER,
  youtubeWatchUrl,
} from './../../../shared/constants/constants';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RatingBadge } from '../../../shared/ui/rating-badge/rating-badge';
import { Router } from '@angular/router';
import { FavouritesMenu } from '../../favourites-menu/favourites-menu';
import { ContentCard } from '../../../pages/types/content-card';

interface NormalizedDetails {
  id: number;
  title: string;
  releaseDate: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  tagline: string;
  trailerKey?: string | null;
}

@Component({
  selector: 'app-movie-details-card',
  imports: [RatingBadge, FavouritesMenu],
  templateUrl: './movie-details-card.html',
  styleUrl: './movie-details-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsCard {
  data = input<ContentDetails>();
  contentCard = computed(() => (this.data() ? (this.data() as ContentCard) : undefined));
  router = inject(Router);

  private readonly fallback: NormalizedDetails = {
    id: 1,
    title: 'No title available.',
    poster_path: FALLBACK_POSTER,
    overview: 'No description available.',
    tagline: 'No tagline available.',
    vote_average: 0,
    releaseDate: 'No release date available.',
    trailerKey: 'No trailer availiable',
  };

  displayData = computed<NormalizedDetails>(() => {
    const detail = this.data();

    if (!detail) return this.fallback;

    const isMovie = detail.media_type === 'movie';

    return {
      id: detail.id,
      title: isMovie ? (detail.title ?? this.fallback.title) : (detail.name ?? this.fallback.title),
      releaseDate: isMovie ? detail.release_date : detail.first_air_date,
      poster_path: detail.poster_path
        ? cardTrailerURL + detail.poster_path
        : this.fallback.poster_path,
      overview: detail.overview || this.fallback.overview,
      vote_average: detail.vote_average ?? this.fallback.vote_average,
      tagline: detail.tagline || this.fallback.tagline,
      trailerKey: detail.trailerKey,
    };
  });

  openTrailer(): void {
    const details = this.displayData();
    if (details?.trailerKey) {
      const url = `${youtubeWatchUrl}${details.trailerKey}`;
      window.open(url, '_blank');
    } else {
      console.warn('Trailer not available');
    }
  }
}
