import { MovieBase } from './movie-base';

export interface MovieDetails extends MovieBase {
  genres: { id: number; name: string }[];
  runtime: number;
  media_type: 'movie';
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  homepage: string | null;
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
  trailerKey?: string | null;
}
