import { Component, inject } from '@angular/core';
import { FavouritesStore } from '../../shared/store/states/favourites.state';
import { Dispatcher } from '@ngrx/signals/events';
import { favouritesEvents } from '../../shared/store/events/favourites.events';
import { SliderCard } from '../home/slider-card/slider-card';
import { ContentCard } from '../types/content-card';

@Component({
  selector: 'app-favourites',
  imports: [SliderCard],
  templateUrl: './favourites.html',
  styleUrl: './favourites.scss',
})
export class Favourites {
  readonly favouritesStore = inject(FavouritesStore);
  private readonly dispatcher = inject(Dispatcher);

  constructor() {
    if (this.favourites().length === 0) this.dispatcher.dispatch(favouritesEvents.loadFavourites());
    else this.dispatcher.dispatch(favouritesEvents.loadListItem());
  }

  favourites = this.favouritesStore.favouritesLists;

  deleteFromFavourites(id: string, item: ContentCard) {
    const contentId = `${item.media_type}/${item.id}`;
    this.dispatcher.dispatch(favouritesEvents.deleteFromFavourites({ id, contentId }));
  }
}
