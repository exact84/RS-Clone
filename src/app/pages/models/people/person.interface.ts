import { BasePerson } from './base-person';
import { KnownForPerson } from './known-for-person.interface';

export interface Person extends BasePerson {
  character?: string;
  known_for: KnownForPerson[];
}
