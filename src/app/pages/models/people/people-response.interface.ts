import { PersonListItem } from './person-list-item.interface';

export interface PeopleResponse {
  page: number;
  results: PersonListItem[];
  total_pages: number;
  total_results: number;
}
