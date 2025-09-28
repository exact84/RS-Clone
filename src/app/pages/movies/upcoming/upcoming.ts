import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { BaseMovieListComponent } from '../base-movie-component';

import { Observable } from 'rxjs';
import { ContentCard } from '../../types/content-card';
import { GenresTabs } from '../genres/genres-tabs/genres-tabs';
import { SliderCard } from '../../home/slider-card/slider-card';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { Button } from '../../../shared/ui/button/button';
import { MovieService } from '../services/movie-service';
import { PARAMS_TOKEN } from '../services/parameters-token';

const today = new Date();
const threeMonthsLater = new Date();
threeMonthsLater.setMonth(today.getMonth() + 3);

@Component({
  selector: 'app-upcoming',
  imports: [GenresTabs, SliderCard, Spinner, Button],
  templateUrl: './upcoming.html',
  styleUrls: ['./upcoming.scss', '../movies.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MovieService,
    {
      provide: PARAMS_TOKEN,
      useValue: {
        'release_date.gte': new Date().toISOString().split('T')[0],
        'release_date.lte': threeMonthsLater.toISOString().split('T')[0],
      },
    },
  ],
})
export class Upcoming extends BaseMovieListComponent {
  private movieService = inject(MovieService);
  readonly title = input.required<string>();
  readonly scrollAnchor = viewChild('scrollAnchor', { read: ElementRef });

  constructor() {
    super();
    effect(() => {
      if (this.isMoviesLoading()) return;
      this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  protected fetchMovies(genreId: number, page: number): Observable<ContentCard[]> {
    return this.movieService.getMoviesByGenre(genreId, page);
  }

  override genreSelected(genreId: number) {
    super.genreSelected(genreId);

    this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
