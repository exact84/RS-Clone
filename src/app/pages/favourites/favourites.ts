import { Component, inject } from '@angular/core';
import { FavouritesStore } from '../../shared/store/states/favourites.state';
import { Dispatcher } from '@ngrx/signals/events';
import { favouritesEvents } from '../../shared/store/events/favourites.events';
import { SliderCard } from '../home/slider-card/slider-card';
import { Spinner } from '../../shared/ui/spinner/spinner';

@Component({
  selector: 'app-favourites',
  imports: [SliderCard, Spinner],
  templateUrl: './favourites.html',
  styleUrl: './favourites.scss',
})
export class Favourites {
  readonly favouritesStore = inject(FavouritesStore);
  private readonly dispatcher = inject(Dispatcher);

  constructor() {
    if (this.favourites().length === 0)
      this.dispatcher.dispatch(favouritesEvents.loadFavourites({ withItems: true }));
    else this.dispatcher.dispatch(favouritesEvents.loadListItem());
  }

  favourites = this.favouritesStore.favouritesLists;
  isLoading = this.favouritesStore.isLoading;
  errorMessage = this.favouritesStore.errorMessage;
}
