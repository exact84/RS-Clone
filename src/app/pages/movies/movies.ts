import { Component } from '@angular/core';
import { MovieSearchFilter } from './movie-search-filter/movie-search-filter';

@Component({
  selector: 'app-movies',
  imports: [MovieSearchFilter],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {}
