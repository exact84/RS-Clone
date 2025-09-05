import { Component, input } from '@angular/core';

@Component({
  selector: 'app-password-icon',
  imports: [],
  templateUrl: './password-icon.html',
  styleUrl: './password-icon.scss',
})
export class PasswordIcon {
  showPassword = input.required<boolean>();
}
