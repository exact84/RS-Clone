import { ContentCard } from '../../types/content-card';

export interface FavouritesInterface {
  id: string;
  label: string;
  ids: string[];
  userId: string;
}

export interface ExtendedFavourites extends FavouritesInterface {
  items?: ContentCard[];
}
