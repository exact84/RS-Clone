import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Trailers } from './trailers/trailers';
import { Trending } from './trending/trending';
import { Popular } from './popular/popular';
import { FreeToWatch } from './free-to-watch/free-to-watch';

@Component({
  selector: 'app-home',
  imports: [Trailers, Trending, Popular, FreeToWatch],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
