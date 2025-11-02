export interface BasePerson {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
}
