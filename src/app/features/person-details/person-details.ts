import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PersonDetailsService } from './services/person-details-service';
import { ActivatedRoute } from '@angular/router';
import { cardTrailerURL, FALLBACK_ACTOR, SPINNER_PATH } from '../../shared/constants/constants';
import { BehaviorSubject } from 'rxjs';
import { PersonDetailsItem } from '../../pages/models/people/person-details.interface';
import { KnownForPerson } from '../../pages/models/people/known-for-person.interface';

@Component({
  selector: 'app-person-details',
  imports: [],
  templateUrl: './person-details.html',
  styleUrl: './person-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetails {
  personDetailsService = inject(PersonDetailsService);
  readonly route = inject(ActivatedRoute);
  readonly spinnerPath = SPINNER_PATH;
  readonly detailsError = signal<string | null>(null);
  readonly personDetails = signal<PersonDetailsItem | null>(null);
  readonly knownFor = signal<KnownForPerson | null>(null);
  readonly loading = signal(false);
  readonly cardImg = cardTrailerURL;

  private readonly routeParams$ = new BehaviorSubject<{ id: number }>({
    id: Number(this.route.snapshot.paramMap.get('id')),
  });

  protected uiState = computed(() => {
    if (this.loading()) return 'loading';
    if (this.detailsError()) return 'error';
    if (this.personDetails()) return 'success';
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

      this.loading.set(true);
      this.detailsError.set(null);

      this.personDetailsService.getPersonDetails(id).subscribe({
        next: (details) => {
          this.personDetails.set(details);
          this.loading.set(false);
        },
        error: () => {
          this.detailsError.set('Failed to load person details');
          this.loading.set(false);
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
