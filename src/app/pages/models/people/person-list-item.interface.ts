import { BasePerson } from './base-person';
import { KnownForPerson } from './known-for-person.interface';

export interface PersonListItem extends BasePerson {
  known_for: KnownForPerson[];
}
