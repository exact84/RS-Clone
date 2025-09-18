import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { actorPhotoURL, FALLBACK_ACTOR } from '../../constants/constants';
import { Person } from '../../../pages/models/people/person.interface';

@Component({
  selector: 'app-person-card',
  imports: [],
  templateUrl: './person-card.html',
  styleUrl: './person-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCard {
  data = input.required<Person>();
  variant = input.required<'default' | 'compact'>();
  size = input.required<'sm' | 'md' | 'lg'>();

  getProfileImage(): string {
    return this.data().profile_path
      ? `${actorPhotoURL}${this.data().profile_path}`
      : `${FALLBACK_ACTOR}`;
  }
}
