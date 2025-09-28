import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { PopularMoviesService } from './services/popular-movies-service';
import { GenresTabs } from '../genres/genres-tabs/genres-tabs';
import { ContentCard } from '../../types/content-card';
import { SliderCard } from '../../home/slider-card/slider-card';
import { Observable } from 'rxjs';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { Button } from '../../../shared/ui/button/button';
import { BaseMovieListComponent } from '../base-movie-component';

@Component({
  selector: 'app-popular-movies',
  imports: [GenresTabs, SliderCard, Spinner, Button],
  templateUrl: './popular-movies.html',
  styleUrls: ['./popular-movies.scss', '../movies.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularMovies extends BaseMovieListComponent {
  private popularMoviesService = inject(PopularMoviesService);
  readonly scrollAnchor = viewChild('scrollAnchor', { read: ElementRef });
  readonly title = input.required<string>();

  constructor() {
    super();
    effect(() => {
      if (this.isMoviesLoading()) return;
      this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  protected fetchMovies(genreId: number, page: number): Observable<ContentCard[]> {
    return this.popularMoviesService.getMoviesByGenre(genreId, page);
  }

  override genreSelected(genreId: number) {
    super.genreSelected(genreId);

    this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
