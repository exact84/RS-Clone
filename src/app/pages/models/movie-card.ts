import { MovieBase } from './movie-base';

export interface MovieCard extends MovieBase {
  media_type: string | undefined;
  popularity?: number | undefined;
}
