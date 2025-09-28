import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { ContentCard } from '../../types/content-card';
import { NowPlayingService } from './services/now-playing-service';
import { Observable } from 'rxjs';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { SliderCard } from '../../home/slider-card/slider-card';
import { GenresTabs } from '../genres/genres-tabs/genres-tabs';
import { BaseMovieListComponent } from '../base-movie-component';
import { Button } from '../../../shared/ui/button/button';

@Component({
  selector: 'app-now-playing',
  imports: [Spinner, SliderCard, GenresTabs, Button],
  templateUrl: './now-playing.html',
  styleUrls: ['./now-playing.scss', '../movies.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NowPlaying extends BaseMovieListComponent {
  readonly nowPlayingService = inject(NowPlayingService);

  readonly scrollAnchor = viewChild('scrollAnchor', { read: ElementRef });

  constructor() {
    super();

    effect(() => {
      if (this.isMoviesLoading()) return;
      this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  protected fetchMovies(genreId: number, page: number): Observable<ContentCard[]> {
    return this.nowPlayingService.getNowPlayingByGenre(genreId, page);
  }

  override genreSelected(genreId: number) {
    super.genreSelected(genreId);

    this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
