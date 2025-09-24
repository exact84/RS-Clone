import { Component, computed, inject, input, signal } from '@angular/core';
import { ContentCard } from '../../pages/types/content-card';
import { FavouritesMenuService } from './services/favourites-menu.service';
import { FavouriteIcons } from './favourite-icons/favourite-icons';
import { FavouritesStore } from '../../shared/store/states/favourites.state';
import { AuthService } from '../../pages/auth/services/auth.service';
import { ExtendedFavourites } from '../../pages/favourites/models/favourites';

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
  contentId = computed(() => `${this.contentCard().media_type}/${this.contentCard().id}`);

  isAuth = this.authService.authStatus;
  lists = this.favouritesStore.favouritesLists;
  isInLists = computed(() => {
    return this.lists().some((item) => this.isInFavourites(item.ids));
  });
  isOpenList = signal(false);

  isInFavourites(ids: string[]) {
    return ids.includes(this.contentId());
  }

  showList() {
    this.isOpenList.set(true);
  }

  closeList() {
    this.isOpenList.set(false);
  }

  toggleFavourite(list: ExtendedFavourites) {
    if (list.ids.includes(this.contentId()))
      this.favouritesMenuService.deleteFromFavourites(list.id, this.contentId());
    else this.favouritesMenuService.addToFavourites(list.id, this.contentCard());
  }
}
