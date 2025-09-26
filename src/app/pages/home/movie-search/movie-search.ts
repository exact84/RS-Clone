import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  imports: [],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.scss',
})
export class MovieSearch {
  router = inject(Router);
  submitSearch(query: string) {
    query = query.trim();
    if (query) {
      this.router.navigate(['/movies/search'], { queryParams: { query } });
    }
  }
}
