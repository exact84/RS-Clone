import { TVCard } from '../../../pages/models/tv-card';

export const mockTVCards: TVCard[] = [
  {
    id: 101,
    name: 'The Great Show',
    original_name: 'The Great Show',
    original_language: 'en',
    overview: 'A thrilling drama about ambition and betrayal.',
    poster_path: '/great-show.jpg',
    backdrop_path: null,
    first_air_date: '2023-06-15',
    vote_average: 8.3,
    vote_count: 1200,
    genre_ids: [18, 10_765],
    popularity: 95,
    media_type: 'tv',
  },
  {
    id: 102,
    name: 'Comedy Nights',
    original_name: 'Comedy Nights',
    original_language: 'en',
    overview: 'A hilarious sketch show featuring top comedians.',
    poster_path: '/comedy-nights.jpg',
    backdrop_path: '/comedy-bg.jpg',
    first_air_date: '2023-07-10',
    vote_average: 7.9,
    vote_count: 850,
    genre_ids: [35],
    popularity: 88,
    media_type: 'tv',
  },
];
