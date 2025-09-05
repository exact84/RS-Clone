import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MenuService } from '../services/menu-service';
import { MenuItem } from '../models/menu-item.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sub-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sub-menu.html',
  styleUrl: './sub-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubMenu {
  menuService = inject(MenuService);
  menu = input.required<MenuItem[]>();
  parentRoute = input.required<string>();
  readonly navigate = output<void>();
}
