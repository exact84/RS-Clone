import { ExtendedFavourites } from '../../../pages/favourites/models/favourites';
import { mockMovieCards } from './movie-card.mock';

export const mockExtendedFavourites: ExtendedFavourites[] = [
  {
    id: 'list-1',
    label: 'Watch Later',
    userId: 'user-123',
    ids: ['movie/1'],
    items: [mockMovieCards[0]],
  },
  {
    id: 'list-2',
    label: 'Top Picks',
    userId: 'user-123',
    ids: ['movie/2'],
    items: [mockMovieCards[1]],
  },
  {
    id: 'list-3',
    label: 'Empty List',
    userId: 'user-123',
    ids: [],
    items: [],
  },
];
