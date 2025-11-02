import { ChangeDetectionStrategy, Component, inject, signal, input, computed } from '@angular/core';
import { MediaType } from './types/media-type';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DetailsCardService } from './services/details-card-service';
import { MovieDetailsCard } from './movie-details-card/movie-details-card';
import { HorizontalSlider } from '../../shared/ui/horizontal-slider/horizontal-slider';
import { TopBilledCastService } from './services/top-billed-cast-service';
import { PersonCard } from '../../shared/ui/person-card/person-card';
import { RecommendationsService } from './services/recommendations-service';
import { RecommendationCard } from './recommendation-card/recommendation-card';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Spinner } from '../../shared/ui/spinner/spinner';

@Component({
  selector: 'app-movie-details',
  imports: [MovieDetailsCard, HorizontalSlider, PersonCard, RecommendationCard, Spinner],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetails {
  readonly id = input.required<number>();
  readonly type = input.required<MediaType>();

  readonly detailsCardsService = inject(DetailsCardService);
  readonly topBilledCastService = inject(TopBilledCastService);
  readonly recommendationsService = inject(RecommendationsService);

  private readonly routeParams = computed(() => ({
    id: this.id(),
    type: this.type(),
  }));

  private readonly parameters$ = toObservable(this.routeParams);

  readonly cardDetailsError = this.detailsCardsService.errorSignal;
  readonly cardDetailsLoading = signal(true);

  readonly cardDetails = toSignal(
    this.parameters$.pipe(
      tap(() => {
        this.cardDetailsLoading.set(true);
      }),
      switchMap(({ id, type }) =>
        this.detailsCardsService
          .getMovieDetails(id, type)
          .pipe(tap(() => this.cardDetailsLoading.set(false))),
      ),
    ),
    { initialValue: undefined },
  );

  readonly castError = this.topBilledCastService.errorSignal;
  readonly castLoading = signal(true);

  readonly cast = toSignal(
    this.parameters$.pipe(
      tap(() => {
        this.castLoading.set(true);
        this.castError.set(null);
      }),
      switchMap(({ id, type }) =>
        this.topBilledCastService.getCast(id, type).pipe(
          tap({
            next: () => this.castLoading.set(false),
            error: () => this.castLoading.set(false),
          }),
          catchError(() => of([])),
        ),
      ),
    ),
    { initialValue: [] },
  );

  readonly recommendationsError = this.recommendationsService.errorSignal;
  readonly recommendationsLoading = signal(true);

  readonly recommendations = toSignal(
    this.parameters$.pipe(
      tap(() => {
        this.recommendationsLoading.set(true);
      }),
      switchMap(({ id, type }) =>
        this.recommendationsService.getRecommendations(id, type).pipe(
          tap({
            next: () => this.recommendationsLoading.set(false),
            error: () => this.recommendationsLoading.set(false),
          }),
          catchError(() => of([])),
        ),
      ),
    ),
    { initialValue: [] },
  );
}
