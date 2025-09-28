import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { BaseMovieListComponent } from '../base-movie-component';

import { UpcomingService } from './services/upcoming-service';
import { Observable } from 'rxjs';
import { ContentCard } from '../../types/content-card';
import { GenresTabs } from '../genres/genres-tabs/genres-tabs';
import { SliderCard } from '../../home/slider-card/slider-card';
import { Spinner } from '../../../shared/ui/spinner/spinner';

@Component({
  selector: 'app-upcoming',
  imports: [GenresTabs, SliderCard, Spinner],
  templateUrl: './upcoming.html',
  styleUrls: ['./upcoming.scss', '../movies.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Upcoming extends BaseMovieListComponent {
  private upcomingService = inject(UpcomingService);
  readonly scrollAnchor = viewChild('scrollAnchor', { read: ElementRef });

  constructor() {
    super();
    this.setScrollAnchorSignal(this.scrollAnchor);
  }

  protected fetchMovies(genreId: number, page: number): Observable<ContentCard[]> {
    return this.upcomingService.getUpcomingByGenre(genreId, page);
  }

  override genreSelected(genreId: number) {
    super.genreSelected(genreId);

    this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
