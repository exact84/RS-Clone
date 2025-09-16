import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaType } from './types/media-type';
import { toSignal } from '@angular/core/rxjs-interop';
import { DetailsCardService } from './services/details-card-service';
import { MovieDetailsCard } from './movie-details-card/movie-details-card';
import { SPINNER_PATH } from '../../shared/constants/constants';
import { HorizontalSlider } from '../../shared/ui/horizontal-slider/horizontal-slider';
import { TopBilledCastService } from './services/top-billed-cast-service';
import { PersonCard } from '../../shared/ui/person-card/person-card';
import { RecommendationsService } from './services/recommendations-service';
import { RecommendationCard } from './recommendation-card/recommendation-card';
import { EMPTY, map } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  imports: [MovieDetailsCard, HorizontalSlider, PersonCard, RecommendationCard],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetails {
  readonly route = inject(ActivatedRoute);
  readonly detailsCardsService = inject(DetailsCardService);
  readonly topBilledCastService = inject(TopBilledCastService);
  readonly recommendationsService = inject(RecommendationsService);
  readonly spinnerPath = SPINNER_PATH;

  readonly type = this.route.snapshot.paramMap.get('type') as MediaType;
  readonly id = Number(this.route.snapshot.paramMap.get('id'));

  readonly routeParams = toSignal(
    this.route.paramMap.pipe(
      map((parameter) => ({
        id: Number(parameter.get('id')),
        type: parameter.get('type') ?? 'movie',
      })),
    ),
  );

  readonly currentId = computed(() => {
    const parameters = this.routeParams();
    if (!parameters) return;

    const id = parameters.id;
    return id;
  });

  readonly currentType = computed(() => {
    const parameters = this.routeParams();
    if (!parameters) return;
    const type = parameters.type;
    return ['movie', 'tv'].includes(type) ? (type as MediaType) : undefined;
  });

  // readonly cardDetails: Signal<ContentDetails | undefined> = toSignal(
  //   this.detailsCardsService.getMovieDetails(this.currentId()!, this.currentType()!),
  //   {
  //     initialValue: undefined,
  //   },
  // );
  // readonly cardDetails: Signal<ContentDetails | undefined> = toSignal(
  //   computed(() => {
  //     const id = this.currentId();
  //     const type = this.currentType();
  //     if (!id || !type) return EMPTY;

  //     return this.detailsCardsService.getMovieDetails(id, type);
  //   })(),
  //   { initialValue: undefined }
  // );

  // getCardDetailsSignal(): Signal<ContentDetails | undefined> {
  //   return toSignal(
  //     computed(() => {
  //       const id = this.currentId();
  //       const type = this.currentType();
  //       if (!id || !type) return EMPTY;

  //       return this.detailsCardsService.getMovieDetails(id, type);
  //     })(),
  //     { initialValue: undefined },
  //   );
  // }

  readonly cardDetails = toSignal(
    computed(() => {
      const id = this.currentId();
      const type = this.currentType();
      if (!id || !type) return EMPTY;

      return this.detailsCardsService.getMovieDetails(id, type);
    })(),
    { initialValue: undefined },
  );

  readonly isLoading = computed(() => this.cardDetails() === undefined);

  readonly isError = computed(() => this.detailsCardsService.errorSignal());

  readonly cast = toSignal(this.topBilledCastService.getCast(this.routeParams()!.id), {
    initialValue: [],
  });

  readonly recommendations = toSignal(
    this.recommendationsService.getRecommendations(this.routeParams()!.id),
    {
      initialValue: [],
    },
  );

  constructor() {
    effect(() => {
      console.log(this.currentId());
      console.log(this.currentType());
    });

    effect(() => {
      const id = this.currentId();
      const type = this.currentType();
      if (!id || !type) return;

      console.log('Calling getMovieDetails with:', id, type);
    });

    effect(() => {
      const id = this.currentId();
      const type = this.currentType();
      if (!id || !type) return;

      const obs = this.detailsCardsService.getMovieDetails(id, type);
      console.log('Observable identity:', obs);
    });

    effect(() => {
      console.log('cardDetails updated:', this.cardDetails());
    });
  }
}
