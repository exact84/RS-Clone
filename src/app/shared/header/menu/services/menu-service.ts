import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  items: MenuItem[] = [];
  showVerticalMenu = false;

  toggleMenu(): void {
    this.showVerticalMenu = !this.showVerticalMenu;
  }
}
