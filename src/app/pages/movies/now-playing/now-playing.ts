import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { ContentCard } from '../../types/content-card';
import { NowPlayingService } from './services/now-playing-service';
import { Observable } from 'rxjs';
import { Spinner } from '../../../shared/ui/spinner/spinner';
import { SliderCard } from '../../home/slider-card/slider-card';
import { GenresTabs } from '../genres/genres-tabs/genres-tabs';
import { CdkFixedSizeVirtualScroll, ScrollingModule } from '@angular/cdk/scrolling';
import { BaseMovieListComponent } from '../base-movie-component';

@Component({
  selector: 'app-now-playing',
  imports: [Spinner, SliderCard, GenresTabs, ScrollingModule, CdkFixedSizeVirtualScroll],
  templateUrl: './now-playing.html',
  styleUrls: ['./now-playing.scss', '../movies.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NowPlaying extends BaseMovieListComponent {
  readonly nowPlayingService = inject(NowPlayingService);

  readonly scrollAnchor = viewChild('scrollAnchor', { read: ElementRef });

  constructor() {
    super();
    this.setScrollAnchorSignal(this.scrollAnchor);
  }

  protected fetchMovies(genreId: number, page: number): Observable<ContentCard[]> {
    return this.nowPlayingService.getNowPlayingByGenre(genreId, page);
  }

  override genreSelected(genreId: number) {
    super.genreSelected(genreId);

    this.scrollAnchor()?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
