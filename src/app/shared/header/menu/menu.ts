import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScreenService } from '../../../core/screen-service';
import { MenuService } from './services/menu-service';
import { MenuItems } from './data/manu-data';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  screenService = inject(ScreenService);
  menuService = inject(MenuService);

  constructor() {
    this.menuService.items = MenuItems;
  }
}
