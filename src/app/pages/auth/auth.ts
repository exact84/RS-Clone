import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  router = inject(Router);

  constructor() {
    this.router.navigate(['auth', 'signup']);
  }
}
