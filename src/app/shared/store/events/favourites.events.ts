import { eventGroup } from '@ngrx/signals/events';
import { type } from '@ngrx/signals';
import { FavouritesInterface } from '../../../pages/favourites/models/favourites';
import { ContentCard } from '../../../pages/types/content-card';

export const favouritesEvents = eventGroup({
  source: 'Favourites',
  events: {
    loadFavourites: type<void>(),
    loadFavouritesSuccess: type<FavouritesInterface[]>(),
    loadFavouritesError: type<string>(),
    loadListItem: type<void>(),
    loadListItemSuccess: type<{
      id: string;
      data: ContentCard[];
    }>(),
    createNewList: type<string>(),
    createNewListSuccess: type<FavouritesInterface>(),
    addToFavourites: type<{
      id: string;
      data: ContentCard;
    }>(),
    addToFavouritesSuccess: type<{
      id: string;
      data: ContentCard;
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
