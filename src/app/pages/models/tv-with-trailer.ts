import { TVCard } from './tv-card';

export interface TVWithTrailer extends TVCard {
  trailerKey: string | null;
}
