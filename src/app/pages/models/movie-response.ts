import { MovieCard } from './movie-card';

export interface MovieResponse {
  page: number;
  results: MovieCard[];
  total_pages: number;
  total_results: number;
}
