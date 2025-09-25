import { MovieCard } from '../../../pages/models/movie-card';

export const mockMovieCards: MovieCard[] = [
  {
    id: 1,
    title: 'Movie One',
    original_title: 'Movie One',
    overview: 'Overview for Movie One',
    poster_path: '/m1.jpg',
    backdrop_path: null,
    release_date: '2023-01-01',
    vote_average: 7.5,
    vote_count: 1000,
    genre_ids: [28],
    media_type: 'movie',
    popularity: 100,
  },
  {
    id: 2,
    title: 'Movie Two',
    original_title: 'Movie Two',
    overview: 'Overview for Movie Two',
    poster_path: '/m2.jpg',
    backdrop_path: null,
    release_date: '2023-01-02',
    vote_average: 8,
    vote_count: 1200,
    genre_ids: [12],
    media_type: 'movie',
    popularity: 120,
  },
];
