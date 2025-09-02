import { ScreenSmallDirective } from './directives/screen-small-directive';
import { Component, inject } from '@angular/core';
import { ScreenService } from '../../core/screen-service';
import { MenuService } from './menu/services/menu-service';
import { MenuItems } from './menu/data/manu-data';
import { Menu } from './menu/menu';
import { ScreenLargeDirective } from './directives/screen-large-directive';

@Component({
  selector: 'app-header',
  imports: [Menu, ScreenLargeDirective, ScreenSmallDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected screenService = inject(ScreenService);
  protected menuService = inject(MenuService);

  constructor() {
    this.menuService.items = MenuItems;
  }
}
