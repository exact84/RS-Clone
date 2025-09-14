import { MovieCard } from '../../pages/models/movie-card';
import { MovieDetails } from '../../pages/models/movie-details';
import { TVCard } from '../../pages/models/tv-card';
import { TVDetails } from '../../pages/models/tv-details';
import { ContentCard } from '../../pages/types/content-card';
import { ContentDetails } from '../../pages/types/content-details';

export function isMovie(data: ContentCard | undefined): data is MovieCard {
  return !!data && 'title' in data;
}

export function isTV(data: ContentCard | undefined): data is TVCard {
  return !!data && 'original_name' in data;
}

//   export function isMovieDetails(
//     data: MovieDetails | TVDetails | undefined
//   ): data is MovieDetails {
//     return !!data && 'title' in data;
//   }

//   export function isTVDetails(
//     data: MovieDetails | TVDetails | undefined
//   ): data is TVDetails {
//     return !!data && 'name' in data;
//   }

export function isMovieDetails(content: ContentDetails): content is MovieDetails {
  return 'title' in content;
}

export function isTVDetails(content: ContentDetails): content is TVDetails {
  return 'name' in content;
}
