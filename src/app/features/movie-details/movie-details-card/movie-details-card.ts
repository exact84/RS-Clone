import { ContentDetails } from '../../../pages/types/content-details';

import { cardTrailerURL } from './../../../shared/constants/constants';
import { Component, computed, input } from '@angular/core';
import { RatingBadge } from '../../../shared/ui/rating-badge/rating-badge';

@Component({
  selector: 'app-movie-details-card',
  imports: [RatingBadge],
  templateUrl: './movie-details-card.html',
  styleUrl: './movie-details-card.scss',
})
export class MovieDetailsCard {
  data = input<ContentDetails>();

  displayData = computed(() => {
    const detail = this.data();

    const fallback = {
      title: '',
      releaseDate: '',
      poster_path: '',
      overview: '',
      vote_average: 0,
      tagline: '',
    };

    if (!detail) return fallback;

    const isMovie = detail.media_type === 'movie';

    return {
      title: isMovie ? detail.title : detail.name,
      releaseDate: isMovie ? detail.release_date : detail.first_air_date,
      poster_path: cardTrailerURL + detail.poster_path,
      overview: detail.overview,
      vote_average: detail.vote_average,
      tagline: detail.tagline,
    };
  });
}
