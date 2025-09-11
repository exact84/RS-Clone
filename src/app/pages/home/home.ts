import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Trailers } from './trailers/trailers';
import { Trending } from './trending/trending';

@Component({
  selector: 'app-home',
  imports: [Trailers, Trending],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
