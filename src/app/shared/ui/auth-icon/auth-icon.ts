import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-icon',
  imports: [],
  templateUrl: './auth-icon.html',
  styleUrl: './auth-icon.scss',
})
export class AuthIcon {
  icon = input.required<'signup' | 'login' | 'logout'>();
}
