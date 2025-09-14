import { ContentDetails } from '../../../pages/types/content-details';
import { cardTrailerURL } from './../../../shared/constants/constants';
import { Component, computed, input } from '@angular/core';
import { RatingBadge } from '../../../shared/ui/rating-badge/rating-badge';

interface NormalizedDetails {
  title: string;
  releaseDate: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  tagline: string;
}

@Component({
  selector: 'app-movie-details-card',
  imports: [RatingBadge],
  templateUrl: './movie-details-card.html',
  styleUrl: './movie-details-card.scss',
})
export class MovieDetailsCard {
  data = input<ContentDetails>();

  private readonly fallback: NormalizedDetails = {
    // тут нужно указать только необходимые поля, остальные будут undefuined, а на форме они будут пустым местом.
    title: 'No title available.', // как миним чтобы в потом alt было что-то, а не пустота.
    poster_path: 'assets/images/no-poster.png', // Сделать no-poster.png, чтобы не искалась картинка по несуществующему адресу.
    overview: 'No description available.',
    tagline: 'No tagline available.',
    vote_average: 0,
    releaseDate: 'No release date available.',
    // и тут вссе поля которые ты хочешь что бы НЕ остались пустыми в случае fallback
  };

  displayData = computed<NormalizedDetails>(() => {
    const detail = this.data();

    // const fallback = {
    //   title: '',
    //   releaseDate: '',
    //   poster_path: '',
    //   overview: '',
    //   vote_average: 0,
    //   tagline: '',
    // };

    if (!detail) return this.fallback;

    const isMovie = detail.media_type === 'movie';

    return {
      title: isMovie ? (detail.title ?? this.fallback.title) : (detail.name ?? this.fallback.title),
      releaseDate: isMovie ? detail.release_date : detail.first_air_date,
      poster_path: detail.poster_path
        ? cardTrailerURL + detail.poster_path
        : this.fallback.poster_path,
      overview: detail.overview || this.fallback.overview,
      vote_average: detail.vote_average ?? this.fallback.vote_average,
      tagline: detail.tagline || this.fallback.tagline,
    };
  });
}
