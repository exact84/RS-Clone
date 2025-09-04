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
  submenu = input<MenuItem[] | undefined>();

  onClick(event: Event) {
    if (this.screenService.isLarge()) return;

    event.preventDefault();
    this.menuService.hoveredIndex.set(this.index());
    this.menuService.hoveredSubmenu.set(this.submenu()?.length ? this.submenu() : undefined);
    this.menuService.mouseInItem.set(true);
    this.menuService.mouseInPopup.set(true);
  }
}
