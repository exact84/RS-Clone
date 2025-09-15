import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaType } from './types/media-type';
import { toSignal } from '@angular/core/rxjs-interop';
import { DetailsCardService } from './services/details-card-service';
import { MovieDetailsCard } from './movie-details-card/movie-details-card';
import { ContentDetails } from '../../pages/types/content-details';
import { SPINNER_PATH } from '../../shared/constants/constants';
import { HorizontalSlider } from '../../shared/ui/horizontal-slider/horizontal-slider';
import { TopBilledCastService } from './services/top-billed-cast-service';
import { PersonCard } from '../../shared/ui/person-card/person-card';

@Component({
  selector: 'app-movie-details',
  imports: [MovieDetailsCard, HorizontalSlider, PersonCard],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetails {
  readonly route = inject(ActivatedRoute);
  readonly detailsCardsService = inject(DetailsCardService);
  topBilledCastService = inject(TopBilledCastService);
  readonly type = this.route.snapshot.paramMap.get('type') as MediaType;
  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly spinnerPath = SPINNER_PATH;

  // fallbackDetails: TVDetails = {
  //   media_type: 'tv',
  //   id: 0,
  //   name: '',
  //   original_name: '',
  //   poster_path: '',
  //   overview: '',
  //   first_air_date: '',
  //   vote_average: 0,
  //   vote_count: 0,
  //   original_language: '',
  //   genres: [],
  //   tagline: '',
  //   status: '',
  //   homepage: null,
  //   number_of_seasons: 0,
  //   number_of_episodes: 0,
  //   episode_run_time: [],
  //   production_companies: [],
  //   spoken_languages: [],
  // };

  // fallback будет в movie-details-card

  readonly cardDetails: Signal<ContentDetails | undefined> = toSignal(
    this.detailsCardsService.getMovieDetails(this.id, this.type),
    {
      initialValue: undefined,
    },
  );

  readonly isLoading = computed(() => this.cardDetails() === undefined);

  readonly isError = computed(() => this.detailsCardsService.errorSignal());

  readonly cast = toSignal(this.topBilledCastService.getCast(this.id), {
    initialValue: [],
  });
}
