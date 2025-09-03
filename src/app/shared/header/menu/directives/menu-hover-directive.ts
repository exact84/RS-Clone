import { Directive, inject, input } from '@angular/core';
import { ScreenService } from '../../../../core/screen-service';
import { MenuService } from '../services/menu-service';
import { MenuItem } from '../models/menu-item.interface';

@Directive({
  selector: '[appMenuHoverDirective]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()',
    '(focusin)': 'onEnter()',
    '(focusout)': 'onLeave()',
  },
})
export class MenuHoverDirective {
  private menuService = inject(MenuService);
  private screenService = inject(ScreenService);

  index = input.required<number>();
  submenu = input<MenuItem[] | undefined>([]);

  onEnter() {
    if (!this.screenService.isLarge()) return;
    this.menuService.mouseInItem.set(true);
    this.menuService.mouseInPopup.set(true);
    this.menuService.hoveredIndex.set(this.index());
    this.menuService.hoveredSubmenu.set(this.submenu()?.length ? this.submenu() : undefined);
    console.log('mouse-enter');
    console.log('menuService instance', this.menuService);
  }

  onLeave() {
    if (!this.screenService.isLarge()) return;
    this.menuService.mouseInItem.set(false);
    this.scheduleClose();
  }

  private scheduleClose() {
    setTimeout(() => {
      if (!this.menuService.mouseInItem() && !this.menuService.mouseInPopup()) {
        this.menuService.hoveredIndex.set(undefined);
        this.menuService.hoveredSubmenu.set(undefined);
      }
    }, 5000);
  }
}
