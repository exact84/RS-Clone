import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../models/menu-item.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  items: MenuItem[] = [];
  showVerticalMenu = false;
  readonly hoveredIndex = signal<number | undefined>(0);
  readonly hoveredSubmenu = signal<MenuItem[] | undefined>([]);
  readonly mouseInItem = signal(false);
  readonly mouseInPopup = signal(false);

  toggleMenu(): void {
    this.showVerticalMenu = !this.showVerticalMenu;
  }
}
