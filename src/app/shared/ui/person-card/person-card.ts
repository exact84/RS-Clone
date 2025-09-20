import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { actorPhotoURL, FALLBACK_ACTOR } from '../../constants/constants';
import { Person } from '../../../pages/models/people/person.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-person-card',
  imports: [RouterLink],
  templateUrl: './person-card.html',
  styleUrl: './person-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCard {
  private router = inject(Router);
  data = input.required<Person>();
  variant = input.required<'default' | 'compact'>();
  size = input.required<'sm' | 'md' | 'lg'>();

  getProfileImage(): string {
    return this.data().profile_path
      ? `${actorPhotoURL}${this.data().profile_path}`
      : `${FALLBACK_ACTOR}`;
  }

  goToDetails(): void {
    const card = this.data();
    this.router.navigate(['person', card.id]);
  }
}
