import { Component, computed, inject, signal } from '@angular/core';
import { MoviesTrailersService } from './services/movies-trailers-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';
import { TrailerCard } from './trailer-card/trailer-card';

@Component({
  selector: 'app-trailers',
  imports: [TitleCasePipe, TrailerCard],
  templateUrl: './trailers.html',
  styleUrls: ['./trailers.scss', '../home.scss'],
})
export class Trailers {
  trailersService = inject(MoviesTrailersService);

  categories = signal([
    { label: 'Popular', value: 'popular' as const },
    { label: 'Streaming', value: 'streaming' as const },
    { label: 'On TV', value: 'on-tv' as const },
    { label: 'For Rent', value: 'for-rent' as const },
  ]);

  selectedCategory = signal<'popular' | 'streaming' | 'on-tv' | 'for-rent'>('popular');

  popularMovies = toSignal(this.trailersService.getPopularTrailers(), { initialValue: [] });
  streamingMovies = toSignal(this.trailersService.getStreamingTrailers(), { initialValue: [] });
  tvShows = toSignal(this.trailersService.getTVTrailers(), { initialValue: [] });
  forRentMovies = toSignal(this.trailersService.getForRentTrailers(), { initialValue: [] });

  selectedTrailers = computed(() => {
    switch (this.selectedCategory()) {
      case 'popular': {
        return this.popularMovies();
      }
      case 'streaming': {
        return this.streamingMovies();
      }
      case 'on-tv': {
        return this.tvShows();
      }
      case 'for-rent': {
        return this.forRentMovies();
      }
      default: {
        return [];
      }
    }
  });

  switchCategory(value: 'popular' | 'streaming' | 'on-tv' | 'for-rent') {
    this.selectedCategory.set(value);
  }

  openTrailer(key: string): void {
    window.open(`https://www.youtube.com/watch?v=${key}`, '_blank');
  }
}
