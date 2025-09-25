import { ExtendedFavourites } from '../favourites/models/favourites';

export interface FavouritesStoreSelectors {
  favouritesLists(): ExtendedFavourites[];
  hasFavourites(): boolean;
  error(): string | null;
  loading(): boolean;
}
