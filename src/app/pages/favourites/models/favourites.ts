import { MovieDetailsWithTrailer } from '../../models/movie-details-with-trailer.interface';
import { TVDetailsWithTrailer } from '../../models/tv-details-with-trailer.interface';

export interface FavouritesInterface {
  id: string;
  label: string;
  ids: string[];
  userId: string;
}

export interface ExtendedFavourites extends FavouritesInterface {
  items?: (MovieDetailsWithTrailer | TVDetailsWithTrailer)[];
}
