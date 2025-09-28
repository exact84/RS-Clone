import {
  Component,
  ElementRef,
  inject,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  imports: [],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSearch implements AfterViewInit {
  router = inject(Router);
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }
  submitSearch(query: string) {
    query = query.trim();
    if (query) {
      this.router.navigate(['/movies/search'], { queryParams: { query } });
    }
  }
}
