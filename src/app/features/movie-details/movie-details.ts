import { Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaType } from './types/media-type';
import { toSignal } from '@angular/core/rxjs-interop';
import { DetailsCardService } from './services/details-card-service';
import { MovieDetailsCard } from './movie-details-card/movie-details-card';
import { ContentDetails } from '../../pages/types/content-details';

@Component({
  selector: 'app-movie-details',
  imports: [MovieDetailsCard],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
})
export class MovieDetails {
  readonly route = inject(ActivatedRoute);
  readonly type = this.route.snapshot.paramMap.get('type') as MediaType;
  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly detailsCardsService = inject(DetailsCardService);

  readonly cardDetails: Signal<ContentDetails | undefined> = toSignal(
    this.detailsCardsService.getMovieDetails(this.id, this.type),
    {
      initialValue: undefined,
    },
  );

  readonly safeCardDetails = computed(() => this.cardDetails()!);
}
