import { Directive, inject, input } from '@angular/core';
import { ScreenService } from '../../../../core/screen-service';
import { MenuItem } from '../models/menu-item.interface';
import { MenuService } from '../services/menu-service';

@Directive({
  selector: '[appMenuClickDirective]',
  host: {
    '(click)': 'onClick($event)',
  },
})
export class MenuClickDirective {
  private menuService = inject(MenuService);
  private screenService = inject(ScreenService);

  index = input.required<number>();
  submenu = input.required<MenuItem[] | []>();

  onClick(event: Event) {
    if (this.screenService.isLarge()) return;
    if (!this.menuService.showVerticalMenu) return;

    event.preventDefault();
    this.menuService.clickedIndex.set(this.index());
    this.menuService.hoveredSubmenu.set(this.submenu()?.length ? this.submenu() : undefined);
    console.log('MenuClickDirective click, index:', this.index());
  }
}
