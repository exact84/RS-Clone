import { Component, inject, input, signal } from '@angular/core';
import { ContentCard } from '../../pages/types/content-card';
import { FavouritesMenuService } from './services/favourites-menu.service';

@Component({
  selector: 'app-favourites-menu',
  imports: [],
  templateUrl: './favourites-menu.html',
  styleUrl: './favourites-menu.scss',
  host: {
    '(focusout)': 'closeList()',
    '(mouseleave)': 'closeList()',
    '(mouseenter)': 'showList()',
  },
})
export class FavouritesMenu {
  private readonly favouritesMenuService = inject(FavouritesMenuService);

  readonly contentCard = input.required<ContentCard>();

  lists = this.favouritesMenuService.favouritesLists;
  isOpenList = signal(false);

  isInFavourites(ids: string[]) {
    return ids.includes(`${this.contentCard().media_type}/${this.contentCard().id}`);
  }

  showList() {
    this.isOpenList.set(true);
  }

  closeList() {
    this.isOpenList.set(false);
  }

  addToFavourites(listId: string) {
    this.favouritesMenuService.addToFavourites(listId, this.contentCard());
  }
}
