import { MovieDetails } from './movie-details';
import { VideosResponse } from './video-response.interface';

export interface MovieDetailsWithTrailer extends MovieDetails {
  videos?: VideosResponse;
  trailerKey: string | null;
}
