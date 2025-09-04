import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../models/menu-item.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  items: MenuItem[] = [];
  showVerticalMenu = false;
  readonly hoveredIndex = signal<number | undefined>(100);
  readonly hoveredSubmenu = signal<MenuItem[] | undefined>([]);
  readonly mouseInItem = signal(false);
  readonly mouseInPopup = signal(false);
  readonly clickedIndex = signal<number | undefined>(100);

  toggleMenu(): void {
    if (!this.showVerticalMenu) {
      this.clickedIndex.set(undefined);
      this.hoveredSubmenu.set(undefined);
    }
    this.showVerticalMenu = !this.showVerticalMenu;
  }

  resetSubmenu(): void {
    this.hoveredIndex.set(undefined);
    this.hoveredSubmenu.set(undefined);
    this.mouseInItem.set(false);
    this.mouseInPopup.set(false);
    this.showVerticalMenu = false;
  }

  resetAll(): void {
    this.resetSubmenu();
    this.showVerticalMenu = false;
  }
}
