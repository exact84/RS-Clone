import { MovieDetailsWithTrailer } from './movie-details-with-trailer.interface';
import { TVDetailsWithTrailer } from './tv-details-with-trailer.interface';

export interface MediaDetailsMapWithTrailer {
  movie: MovieDetailsWithTrailer;
  tv: TVDetailsWithTrailer;
}
