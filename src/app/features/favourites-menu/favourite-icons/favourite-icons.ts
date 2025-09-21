import { Component, input } from '@angular/core';

@Component({
  selector: 'app-favourite-icons',
  imports: [],
  templateUrl: './favourite-icons.html',
  styleUrl: './favourite-icons.scss',
})
export class FavouriteIcons {
  readonly icon = input.required<'heart' | 'check'>();
}
