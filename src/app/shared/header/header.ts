import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuService } from './menu/services/menu-service';
import { MenuItems } from './menu/data/menu-data';
import { Menu } from './menu/menu';
import { RouterLink } from '@angular/router';
import { LARGE_SCREEN_BREAKPOINT } from '../constants/constants';
import { AuthIcon } from '../ui/auth-icon/auth-icon';

@Component({
  selector: 'app-header',
  imports: [Menu, RouterLink, AuthIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(mouseleave)': 'mouseLeave()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnDestroy {
  protected menuService = inject(MenuService);

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    this.menuService.items = MenuItems;
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia(`(max-width: ${LARGE_SCREEN_BREAKPOINT}px)`);
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  mouseLeave() {
    if (!this.menuService.menuIsHovered()) this.menuService.resetSubmenu();
  }
}
