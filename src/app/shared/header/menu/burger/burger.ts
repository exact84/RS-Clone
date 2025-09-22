import { Component, inject } from '@angular/core';
import { MenuService } from '../services/menu-service';

@Component({
  selector: 'app-burger',
  imports: [],
  templateUrl: './burger.html',
  styleUrl: './burger.scss',
})
export class Burger {
  menuService = inject(MenuService);

  burgerClass = this.menuService.burgerClass;

  toggleBurger() {
    this.menuService.toggleMenu();
  }
}
