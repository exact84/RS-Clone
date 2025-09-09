import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Trailers } from './trailers/trailers';

@Component({
  selector: 'app-home',
  imports: [Trailers],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
