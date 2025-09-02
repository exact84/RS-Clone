import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  items: MenuItem[] = [];
  isVertical = false;
  showVerticalMenu = false;

  toggleMenu(): void {
    this.isVertical = true;
    this.showVerticalMenu = !this.showVerticalMenu;
  }
}
