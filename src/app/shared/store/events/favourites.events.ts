import { eventGroup } from '@ngrx/signals/events';
import { type } from '@ngrx/signals';
import { MovieDetailsWithTrailer } from '../../../pages/models/movie-details-with-trailer.interface';
import { TVDetailsWithTrailer } from '../../../pages/models/tv-details-with-trailer.interface';
import { FavouritesInterface } from '../../../pages/favourites/models/favourites';

export const favouritesEvents = eventGroup({
  source: 'Favourites',
  events: {
    loadFavourites: type<void>(),
    loadFavouritesSuccess: type<FavouritesInterface[]>(),
    loadFavouritesError: type<string>(),
    loadListItemSuccess: type<{
      id: string;
      data: (MovieDetailsWithTrailer | TVDetailsWithTrailer)[];
    }>(),
    createNewList: type<string>(),
    createNewListSuccess: type<FavouritesInterface>(),
    addToFavourites: type<{
      id: string;
      data: MovieDetailsWithTrailer | TVDetailsWithTrailer;
    }>(),
    addToFavouritesSuccess: type<{
      id: string;
      data: MovieDetailsWithTrailer | TVDetailsWithTrailer;
    }>(),
    deleteFromFavourites: type<{
      id: string;
      contentId: string;
    }>(),
    deleteFromFavouritesSuccess: type<{
      id: string;
      contentId: string;
    }>(),
  },
});
