import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ContentCard } from '../../types/content-card';
import { Observable } from 'rxjs';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { SliderCard } from '../../home/slider-card/slider-card';
import { GenresTabs } from '../genres/genres-tabs/genres-tabs';
import { BaseMovieListComponent } from '../base-movie-component';
import { Button } from '../../../shared/ui/button/button';
import { MovieService } from '../services/movie-service';
import { PARAMS_TOKEN } from '../services/parameters-token';

@Component({
  selector: 'app-now-playing',
  imports: [Spinner, SliderCard, GenresTabs, Button],
  templateUrl: './now-playing.html',
  styleUrls: ['./now-playing.scss', '../movies.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MovieService,
    {
      provide: PARAMS_TOKEN,
      useValue: {
        with_release_type: '2|3',
        'release_date.lte': new Date().toISOString().split('T')[0],
      },
    },
  ],
})
export class NowPlaying extends BaseMovieListComponent {
  readonly movieService = inject(MovieService);
  readonly title = input.required<string>();
  readonly scrollAnchor = viewChild('scrollAnchor', { read: ElementRef });

  constructor() {
    super();
    this.setScrollAnchorSignal(this.scrollAnchor);
  }

  protected fetchMovies(genreId: number, page: number): Observable<ContentCard[]> {
    return this.movieService.getMoviesByGenre(genreId, page);
  }

  override genreSelected(genreId: number) {
    super.genreSelected(genreId);

    this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
