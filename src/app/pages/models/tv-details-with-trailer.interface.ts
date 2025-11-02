import { TVDetails } from './tv-details';
import { VideosResponse } from './video-response.interface';

export interface TVDetailsWithTrailer extends TVDetails {
  videos?: VideosResponse;
  trailerKey: string | null;
}
