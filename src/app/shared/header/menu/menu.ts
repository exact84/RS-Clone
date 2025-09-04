import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScreenService } from '../../../core/screen-service';
import { MenuService } from './services/menu-service';
import { MenuItems } from './data/menu-data';
import { SubMenu } from './sub-menu/sub-menu';
import { MenuHoverDirective } from './directives/menu-hover-directive';
import { ScreenLargeDirective } from '../directives/screen-large-directive';
import { ScreenSmallDirective } from '../directives/screen-small-directive';
import { MenuClickDirective } from './directives/menu-click-directive';
import { MenuItem } from './models/menu-item.interface';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    SubMenu,
    MenuHoverDirective,
    ScreenLargeDirective,
    ScreenSmallDirective,
    MenuClickDirective,
  ],
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

  onMenuItemClick(index: number, item: MenuItem) {
    if (this.screenService.isLarge()) {
      this.menuService.showVerticalMenu = false;
      // переход по маршруту — ничего не мешает
    } else {
      if (item.submenu?.length) {
        // Открываем сабменю, не скрываем вертикальное меню
        const isOpen = this.menuService.hoveredIndex() === index;
        this.menuService.hoveredIndex.set(isOpen ? undefined : index);
        this.menuService.hoveredSubmenu.set(isOpen ? undefined : item.submenu);
      } else {
        // Нет сабменю — можно закрыть вертикальное меню
        this.menuService.showVerticalMenu = false;
      }
    }
  }
}
