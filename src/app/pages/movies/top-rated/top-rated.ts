import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { BaseMovieListComponent } from '../base-movie-component';
import { Button } from '../../../shared/ui/button/button';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { GenresTabs } from '../genres/genres-tabs/genres-tabs';
import { Observable } from 'rxjs';
import { ContentCard } from '../../types/content-card';
import { SliderCard } from '../../home/slider-card/slider-card';
import { PARAMS_TOKEN } from '../services/parameters-token';
import { MovieService } from '../services/movie-service';

@Component({
  selector: 'app-top-rated',
  imports: [Button, Spinner, GenresTabs, SliderCard],
  templateUrl: './top-rated.html',
  styleUrls: ['./top-rated.scss', '../movies.scss'],
  providers: [MovieService, { provide: PARAMS_TOKEN, useValue: { 'vote_average.gte': 8 } }],
})
export class TopRated extends BaseMovieListComponent {
  private movieService = inject(MovieService);

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
