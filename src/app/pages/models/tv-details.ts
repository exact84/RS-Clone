import { TVBase } from './tv-base';

export interface TVDetails extends TVBase {
  media_type: 'tv';
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  homepage: string | null;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
}
