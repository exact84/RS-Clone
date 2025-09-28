import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  AfterViewInit,
  ViewChild,
  ElementRef,
  viewChild,
  ChangeDetectionStrategy,
  viewChild,
} from '@angular/core';
import { MovieSearchService } from './services/movie-search-service';
import { SliderCard } from '../../home/slider-card/slider-card';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { Button } from '../../../shared/ui/button/button';
import { BaseMovieListComponent } from '../base-movie-component';
import { map, Observable } from 'rxjs';
import { ContentCard } from '../../types/content-card';

@Component({
  selector: 'app-movie-search',
  imports: [SliderCard, Spinner, Button],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSearch extends BaseMovieListComponent implements OnInit, AfterViewInit {
  searchService = inject(MovieSearchService);
  @Input() query = '';

  readonly scrollAnchor = viewChild('scrollAnchor', { read: ElementRef });

  constructor() {
    super();
    this.setScrollAnchorSignal(this.scrollAnchor);
  }

  loadingState = signal(false);
  errorState = signal<string | null>(null);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }
  ngOnInit() {
    if (this.query) this.submitSearch(this.query);
  }

  protected fetchMovies(genreId: number, page: number): Observable<ContentCard[]> {
    return this.searchService
      .getSearchedMovies(this.query, page)
      .pipe(map((response) => response.results.map((card) => ({ ...card, media_type: 'movie' }))));
  }

  submitSearch(query: string) {
    if (query) {
      this.loadingState.set(true);
      this.errorState.set(null);

      this.searchService.getSearchedMovies(query).subscribe({
        next: (response) => {
          this.movies.set(response.results.map((m) => ({ ...m, media_type: 'movie' })));
          this.loadingState.set(false);
          this.lazyScrollEnabled.set(false);
        },
        error: (error) => {
          console.error(error);
          this.errorState.set('Failed to load movies. Please try again.');
          this.loadingState.set(false);
        },
      });
    }
  }
}
