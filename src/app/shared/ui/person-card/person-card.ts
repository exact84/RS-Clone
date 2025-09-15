import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { CastPerson } from '../../../pages/models/people/cast-person';
import { actorPhotoURL, FALLBACK_ACTOR } from '../../constants/constants';

@Component({
  selector: 'app-person-card',
  imports: [],
  templateUrl: './person-card.html',
  styleUrl: './person-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCard {
  data = input.required<CastPerson>();
  variant = input.required<'default' | 'compact'>();
  size = input.required<'sm' | 'md' | 'lg'>();

  getProfileImage(): string {
    return this.data().profile_path
      ? `${actorPhotoURL}${this.data().profile_path}`
      : `${FALLBACK_ACTOR}`;
  }

  constructor() {
    effect(() => {
      console.log('PersonCard data:', this.data());
    });
  }
}
