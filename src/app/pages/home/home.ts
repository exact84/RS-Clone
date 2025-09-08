import { Component } from '@angular/core';
import { Trailers } from './trailers/trailers';

@Component({
  selector: 'app-home',
  imports: [Trailers],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
