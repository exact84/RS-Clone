import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScreenService } from '../../../core/screen-service';
import { MenuService } from './services/menu-service';
import { MenuItems } from './data/menu-data';
import { SubMenu } from './sub-menu/sub-menu';
import { MenuHoverDirective } from './directives/menu-hover-directive';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, SubMenu, MenuHoverDirective],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  screenService = inject(ScreenService);
  menuService = inject(MenuService);

  constructor() {
    this.menuService.items = MenuItems;
  }

  onNavigate() {
    this.menuService.hoveredIndex.set(undefined);
    this.menuService.hoveredSubmenu.set(undefined);
    this.menuService.mouseInItem.set(false);
    this.menuService.mouseInPopup.set(false);
    this.menuService.showVerticalMenu = false;
  }
}
