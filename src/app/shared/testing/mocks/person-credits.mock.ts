import { PersonCredits } from '../../../pages/models/people/person-credits.interface';

export const mockPersonCredits: PersonCredits = {
  cast: [
    {
      id: 1,
      title: 'Breaking Bad',
      poster_path: '/bb.jpg',
      media_type: 'tv',
      popularity: 98.5,
      character: 'Walter White',
      first_air_date: '2008-01-20',
    },
    {
      id: 2,
      name: 'Trumbo',
      poster_path: '/trumbo.jpg',
      media_type: 'movie',
      popularity: 87.2,
      character: 'Dalton Trumbo',
      release_date: '2015-11-06',
    },
    {
      id: 3,
      title: 'Untitled Project',
      poster_path: '/untitled.jpg',
      media_type: 'movie',
      popularity: 70,
      character: 'Unknown',
    },
  ],
  crew: [
    {
      id: 4,
      title: 'The One Who Knocks',
      poster_path: '/knocks.jpg',
      media_type: 'movie',
      popularity: 65.4,
      job: 'Director',
      release_date: '2020-05-12',
    },
    {
      id: 5,
      name: 'Better Call Saul',
      poster_path: '/bcs.jpg',
      media_type: 'tv',
      popularity: 72.1,
      job: 'Producer',
      first_air_date: '2015-02-08',
    },
  ],
};
