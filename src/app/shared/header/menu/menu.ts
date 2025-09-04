import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScreenService } from '../../../core/screen-service';
import { MenuService } from './services/menu-service';
import { MenuItems } from './data/menu-data';
import { SubMenu } from './sub-menu/sub-menu';
import { MenuHoverDirective } from './directives/menu-hover-directive';
import { ScreenLargeDirective } from '../directives/screen-large-directive';
import { ScreenSmallDirective } from '../directives/screen-small-directive';
import { MenuClickDirective } from './directives/menu-click-directive';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  screenService = inject(ScreenService);
  menuService = inject(MenuService);

  constructor() {
    this.menuService.items = MenuItems;
  }

  onNavigate() {
    console.log('onNavigate triggered');
    this.menuService.resetSubmenu();
    this.menuService.showVerticalMenu = false;
    this.menuService.hoveredIndex.set(undefined);
    this.menuService.clickedIndex.set(undefined);
  }

  resetIndex() {
    console.log('resetIndex called');
    if (!this.menuService.showVerticalMenu) {
      this.menuService.clickedIndex.set(undefined);
      console.log('clickedIndex after reset:', this.menuService.clickedIndex());
    }
  }
}
