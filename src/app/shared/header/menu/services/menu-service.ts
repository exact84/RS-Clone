import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../models/menu-item.interface';
import { NO_INDEX } from '../../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  items: MenuItem[] = [];
  showVerticalMenu = signal(false);
  readonly hoveredIndex = signal<number>(NO_INDEX);
  readonly hoveredSubmenu = signal<MenuItem[] | []>([]);
  readonly mouseInItem = signal(false);
  readonly mouseInPopup = signal(false);
  readonly clickedIndex = signal<number>(NO_INDEX);
  menuIsHovered = signal(false);
  burgerClass = signal<'open' | 'close' | ''>('');

  toggleMenu(): void {
    if (!this.showVerticalMenu()) {
      this.clickedIndex.set(NO_INDEX);
      this.hoveredSubmenu.set([]);
    }
    this.showVerticalMenu.update((value) => !value);
    this.burgerClass.set(this.showVerticalMenu() ? 'open' : 'close');
  }

  resetSubmenu(): void {
    this.hoveredIndex.set(NO_INDEX);
    this.hoveredSubmenu.set([]);
    this.mouseInItem.set(false);
    this.mouseInPopup.set(false);
    this.showVerticalMenu.set(false);
    this.burgerClass.set('close');
  }
}
