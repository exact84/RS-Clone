import { MovieCard } from './movie-card';

export interface MovieWithTrailer extends MovieCard {
  trailerKey: string | null;
}
