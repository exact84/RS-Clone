import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Trailers } from './trailers/trailers';
import { Trending } from './trending/trending';
import { Popular } from './popular/popular';

@Component({
  selector: 'app-home',
  imports: [Trailers, Trending, Popular],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
