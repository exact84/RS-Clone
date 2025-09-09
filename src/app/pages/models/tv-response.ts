import { TVCard } from './tv-card';

export interface TVResponse {
  page: number;
  results: TVCard[];
  total_pages: number;
  total_results: number;
}
