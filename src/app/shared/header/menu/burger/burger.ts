import { Component, inject } from '@angular/core';
import { MenuService } from '../services/menu-service';

@Component({
  selector: 'app-burger',
  imports: [],
  templateUrl: './burger.html',
  styleUrl: './burger.scss',
  host: {
    '(animationend)': 'deleteClass()',
  },
})
export class Burger {
  menuService = inject(MenuService);

  burgerClass = this.menuService.burgerClass;

  toggleBurger() {
    this.menuService.toggleMenu();
  }

  deleteClass() {
    this.burgerClass.update((value) => (value === 'close' ? '' : value));
  }
}
