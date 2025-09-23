import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { PersonDetailsService } from './services/person-details-service';
import { RouterLink } from '@angular/router';
import { cardTrailerURL, FALLBACK_ACTOR, SPINNER_PATH } from '../../shared/constants/constants';
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
  readonly id = input.required<number>();
  readonly personDetailsService = inject(PersonDetailsService);
  readonly castedInService = inject(CastedInService);

  readonly spinnerPath = SPINNER_PATH;
  readonly detailsError = signal<string | null>(null);
  readonly castedInError = signal<string | null>(null);
  readonly personDetails = signal<PersonDetailsItem | null>(null);
  readonly castedIn = signal<CastedInCard[] | []>([]);
  readonly loadingDetails = signal(false);
  readonly loadingCastedIn = signal(false);
  readonly cardImg = cardTrailerURL;

  protected imageUrl = cardTrailerURL;

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
    effect(() => {
      if (!this.id()) return;

      this.loadingDetails.set(true);
      this.detailsError.set(null);

      const subscription = this.personDetailsService.getPersonDetails(this.id()).subscribe({
        next: (details) => {
          this.personDetails.set(details);
          this.loadingDetails.set(false);
        },
        error: () => {
          this.detailsError.set('Failed to load person details');
          this.loadingDetails.set(false);
        },
      });
      return () => subscription.unsubscribe();
    });

    effect(() => {
      if (!this.id()) return;

      this.loadingCastedIn.set(true);
      this.castedInError.set(null);

      const subscription = this.castedInService.getCastedIn(this.id()).subscribe({
        next: (items) => {
          this.castedIn.set(items);
          this.loadingCastedIn.set(false);
        },
        error: () => {
          this.detailsError.set('Failed to custed in works');
          this.loadingCastedIn.set(false);
        },
      });
      return () => subscription.unsubscribe();
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
