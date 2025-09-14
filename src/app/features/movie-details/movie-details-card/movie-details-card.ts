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
    if (!detail) {
      return {
        title: '',
        releaseDate: '',
        poster_path: '',
        overview: '',
        vote_average: 0,
        tagline: '',
      };
    }

    if ('title' in detail) {
      return {
        title: detail.title,
        releaseDate: detail.release_date,
        poster_path: cardTrailerURL + detail.poster_path,
        overview: detail.overview,
        vote_average: detail.vote_average,
        tagline: detail.tagline,
      };
    } else if ('name' in detail) {
      return {
        title: detail.name,
        releaseDate: detail.first_air_date,
        poster_path: cardTrailerURL + detail.poster_path,
        overview: detail.overview,
        vote_average: detail.vote_average,
        tagline: detail.tagline,
      };
    }
    return {
      title: '',
      releaseDate: '',
      poster_path: '',
      overview: '',
      vote_average: 0,
      tagline: '',
    };
  });
}
