import { BasePerson } from './base-person';

export interface PersonDetailsItem extends BasePerson {
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  also_known_as: string[];
  homepage: string | null;
  gender: number;
}
