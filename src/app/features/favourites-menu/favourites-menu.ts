import { Component, inject, input, signal } from '@angular/core';
import { ContentCard } from '../../pages/types/content-card';
import { FavouritesMenuService } from './services/favourites-menu.service';
import { FavouriteIcons } from './favourite-icons/favourite-icons';
import { FavouritesStore } from '../../shared/store/states/favourites.state';
import { AuthService } from '../../pages/auth/services/auth.service';

@Component({
  selector: 'app-favourites-menu',
  imports: [FavouriteIcons],
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
  private readonly authService = inject(AuthService);
  private readonly favouritesStore = inject(FavouritesStore);

  readonly contentCard = input.required<ContentCard>();

  isAuth = this.authService.authStatus;
  lists = this.favouritesStore.favouritesLists;
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
