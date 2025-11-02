import { TVDetails } from '../../../pages/models/tv-details';

export const mockTVDetails: TVDetails = {
  id: 2,
  name: 'Breaking Bad',
  original_name: 'Breaking Bad',
  original_language: 'en',
  overview: 'A high school chemistry teacher turned methamphetamine producer.',
  poster_path: '/breakingbad.jpg',
  backdrop_path: '/breakingbad-bg.jpg',
  first_air_date: '2008-01-20',
  vote_average: 9.5,
  vote_count: 18_000,
  genre_ids: [18, 80],
  genres: [
    { id: 18, name: 'Drama' },
    { id: 80, name: 'Crime' },
  ],
  media_type: 'tv',
  tagline: 'Change the equation.',
  status: 'Ended',
  homepage: 'https://www.amc.com/shows/breaking-bad',
  number_of_seasons: 5,
  number_of_episodes: 62,
  episode_run_time: [47],
  production_companies: [
    {
      id: 2605,
      logo_path: '/logo-highbridge.png',
      name: 'High Bridge Productions',
      origin_country: 'US',
    },
  ],
  spoken_languages: [
    { iso_639_1: 'en', name: 'English' },
    { iso_639_1: 'es', name: 'Spanish' },
  ],
  trailerKey: 'HhesaQXLuRY',
};
