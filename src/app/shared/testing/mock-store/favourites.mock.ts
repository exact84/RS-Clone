import { signal, computed } from '@angular/core';
import { ExtendedFavourites } from '../../../pages/favourites/models/favourites';

const favouritesSignal = signal<Record<string, ExtendedFavourites>>({});

export const mockFavouritesStore = {
  favouritesLists: computed(() => Object.values(favouritesSignal()) as ExtendedFavourites[]),
};
