import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../models/menu-item.interface';
import { NO_INDEX } from '../../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  items: MenuItem[] = [];
  showVerticalMenu = false;
  readonly hoveredIndex = signal<number>(NO_INDEX);
  readonly hoveredSubmenu = signal<MenuItem[] | []>([]);
  readonly mouseInItem = signal(false);
  readonly mouseInPopup = signal(false);
  readonly clickedIndex = signal<number>(NO_INDEX);
  menuIsHovered = signal(false);

  toggleMenu(): void {
    if (!this.showVerticalMenu) {
      this.clickedIndex.set(NO_INDEX);
      this.hoveredSubmenu.set([]);
    }
    this.showVerticalMenu = !this.showVerticalMenu;
  }

  resetSubmenu(): void {
    this.hoveredIndex.set(NO_INDEX);
    this.hoveredSubmenu.set([]);
    this.mouseInItem.set(false);
    this.mouseInPopup.set(false);
    this.showVerticalMenu = false;
  }
}
