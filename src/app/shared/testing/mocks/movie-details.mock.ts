import { MovieDetails } from '../../../pages/models/movie-details';

export const mockMovieDetails: MovieDetails = {
  id: 1,
  title: 'Inception',
  original_title: 'Inception',
  original_language: 'en',
  overview: 'A thief who steals corporate secrets through dream-sharing technology.',
  poster_path: '/inception.jpg',
  backdrop_path: '/inception-bg.jpg',
  release_date: '2010-07-16',
  vote_average: 8.8,
  vote_count: 21_000,
  genre_ids: [28, 878],
  genres: [
    { id: 28, name: 'Action' },
    { id: 878, name: 'Science Fiction' },
  ],
  runtime: 148,
  media_type: 'movie',
  tagline: 'Your mind is the scene of the crime.',
  status: 'Released',
  budget: 160_000_000,
  revenue: 829_895_144,
  homepage: 'https://www.warnerbros.com/movies/inception',
  production_companies: [
    {
      id: 923,
      logo_path: '/logo-syncopy.png',
      name: 'Syncopy',
      origin_country: 'GB',
    },
  ],
  spoken_languages: [
    { iso_639_1: 'en', name: 'English' },
    { iso_639_1: 'fr', name: 'French' },
  ],
  trailerKey: 'YoHD9XEInc0',
};
