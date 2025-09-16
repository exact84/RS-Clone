import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';

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

  private readonly routeParams$ = new BehaviorSubject<{ id: number; type: MediaType }>({
    id: Number(this.route.snapshot.paramMap.get('id')),
    type: (this.route.snapshot.paramMap.get('type') ?? 'movie') as MediaType,
  });

  readonly routeParams = toSignal(
    this.route.paramMap.pipe(
      map((parameter) => ({
        id: Number(parameter.get('id')),
        type: parameter.get('type') ?? 'movie',
      })),
    ),
  );

  readonly cardDetailsError = this.detailsCardsService.errorSignal;
  readonly cardDetailsLoading = signal(true);

  readonly cardDetails = toSignal(
    this.routeParams$.pipe(
      tap(() => {
        this.cardDetailsLoading.set(true);
      }),
      switchMap(({ id, type }) =>
        this.detailsCardsService.getMovieDetails(id, type).pipe(
          tap({
            next: () => this.cardDetailsLoading.set(false),
            error: () => this.cardDetailsLoading.set(false),
          }),
          catchError(() => of()),
        ),
      ),
    ),
    { initialValue: undefined },
  );

  readonly castError = this.topBilledCastService.errorSignal;
  readonly castLoading = signal(true);

  readonly cast = toSignal(
    this.routeParams$.pipe(
      tap(() => {
        this.castLoading.set(true);
        this.castError.set(null);
      }),
      switchMap(({ id }) =>
        this.topBilledCastService.getCast(id).pipe(
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
    this.routeParams$.pipe(
      tap(() => {
        this.recommendationsLoading.set(true);
      }),
      switchMap(({ id }) =>
        this.recommendationsService.getRecommendations(id).pipe(
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

  constructor() {
    this.route.paramMap
      .pipe(
        map((parameters) => ({
          id: Number(parameters.get('id')),
          type: (parameters.get('type') ?? 'movie') as MediaType,
        })),
      )
      .subscribe(this.routeParams$);
  }
}
