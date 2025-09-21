import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PersonDetailsService } from './services/person-details-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { cardTrailerURL, FALLBACK_ACTOR, SPINNER_PATH } from '../../shared/constants/constants';
import { BehaviorSubject } from 'rxjs';
import { PersonDetailsItem } from '../../pages/models/people/person-details.interface';

import { CastedInService } from './services/casted-in-service';
import { HorizontalSlider } from '../../shared/ui/horizontal-slider/horizontal-slider';
import { CastedInCard } from './casted-in-card.interface';

@Component({
  selector: 'app-person-details',
  imports: [HorizontalSlider, RouterLink],
  templateUrl: './person-details.html',
  styleUrl: './person-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetails {
  readonly personDetailsService = inject(PersonDetailsService);
  readonly castedInService = inject(CastedInService);
  readonly route = inject(ActivatedRoute);
  readonly spinnerPath = SPINNER_PATH;
  readonly detailsError = signal<string | null>(null);
  readonly castedInError = signal<string | null>(null);
  readonly personDetails = signal<PersonDetailsItem | null>(null);
  readonly castedIn = signal<CastedInCard[] | []>([]);
  readonly loadingDetails = signal(false);
  readonly loadingCastedIn = signal(false);
  readonly cardImg = cardTrailerURL;

  protected imageUrl = cardTrailerURL;

  private readonly routeParams$ = new BehaviorSubject<{ id: number }>({
    id: Number(this.route.snapshot.paramMap.get('id')),
  });

  protected uiState = computed(() => {
    if (this.loadingDetails()) return 'loading';
    if (this.detailsError()) return 'error';
    if (this.personDetails()) return 'success';
    return 'idle';
  });
  protected uiStateCasted = computed(() => {
    if (this.loadingCastedIn()) return 'loading';
    if (this.castedInError()) return 'error';
    if (this.castedIn()) return 'success';
    return 'idle';
  });

  protected isBioExpanded = false;

  constructor() {
    this.route.paramMap.subscribe((parameters) => {
      const rawId = parameters.get('id');
      const id = rawId ? Number(rawId) : 0;
      console.log('Route changed, new id:', id);
      this.routeParams$.next({ id });
    });

    effect(() => {
      const { id } = this.routeParams$.value;
      if (!id) return;

      this.loadingDetails.set(true);
      this.detailsError.set(null);

      this.personDetailsService.getPersonDetails(id).subscribe({
        next: (details) => {
          this.personDetails.set(details);
          this.loadingDetails.set(false);
        },
        error: () => {
          this.detailsError.set('Failed to load person details');
          this.loadingDetails.set(false);
        },
      });
    });

    effect(() => {
      const { id } = this.routeParams$.value;
      if (!id) return;

      this.loadingCastedIn.set(true);
      this.castedInError.set(null);

      this.castedInService.getCastedIn(id).subscribe({
        next: (items) => {
          this.castedIn.set(items);
          this.loadingCastedIn.set(false);
        },
        error: () => {
          this.detailsError.set('Failed to custed in works');
          this.loadingCastedIn.set(false);
        },
      });
    });
  }

  get getPosterUrl(): string {
    const value = this.personDetails();
    const path = value?.profile_path;
    return path?.trim().length ? `${cardTrailerURL}${path}` : FALLBACK_ACTOR;
  }

  getGender(code: number): string {
    switch (code) {
      case 1: {
        return 'Female';
      }
      case 2: {
        return 'Male';
      }
      default: {
        return '—';
      }
    }
  }
}
