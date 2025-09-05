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
    const hasSubmenu = this.submenu()?.length > 0;

    const isOpen = this.menuService.clickedIndex() === this.index();

    if (hasSubmenu) {
      event.preventDefault();
      this.menuService.clickedIndex.set(isOpen ? undefined : this.index());
      this.menuService.hoveredSubmenu.set(isOpen ? undefined : this.submenu());
    }
  }
}
