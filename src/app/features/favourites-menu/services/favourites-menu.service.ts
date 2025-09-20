import { inject, Injectable } from '@angular/core';
import { FavouritesStore } from '../../../shared/store/states/favourites.state';
import { Dispatcher } from '@ngrx/signals/events';
import { favouritesEvents } from '../../../shared/store/events/favourites.events';
import { ContentCard } from '../../../pages/types/content-card';

@Injectable({
  providedIn: 'root',
})
export class FavouritesMenuService {
  readonly favouritesStore = inject(FavouritesStore);
  private readonly dispatcher = inject(Dispatcher);

  constructor() {
    if (this.favouritesStore.favouritesLists().length === 0)
      this.dispatcher.dispatch(favouritesEvents.loadFavourites());
  }

  private readonly favouritesListsSignal = this.favouritesStore.favouritesLists;

  get favouritesLists() {
    return this.favouritesListsSignal;
  }

  addToFavourites(listId: string, data: ContentCard) {
    this.dispatcher.dispatch(favouritesEvents.addToFavourites({ id: listId, data }));
  }
}
