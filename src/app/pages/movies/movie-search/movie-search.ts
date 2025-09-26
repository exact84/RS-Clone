import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MovieSearchService } from './services/movie-search-service';
import { MovieCard } from '../../models/movie-card';
import { SliderCard } from '../../home/slider-card/slider-card';
import { Spinner } from '../../../shared/ui/spinner/spinner';

@Component({
  selector: 'app-movie-search',
  imports: [SliderCard, Spinner],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.scss',
})
export class MovieSearch implements OnInit, AfterViewInit {
  searchService = inject(MovieSearchService);
  @Input() query = '';

  movies = signal<MovieCard[]>([]);
  loadingState = signal(false);
  errorState = signal<string | null>(null);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }
  ngOnInit() {
    if (this.query) this.submitSearch(this.query);
  }

  submitSearch(query: string) {
    if (query) {
      this.loadingState.set(true);
      this.errorState.set(null);

      this.searchService.getSearchedMovies(query).subscribe({
        next: (response) => {
          this.movies.set(response.results);
          this.loadingState.set(false);
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
