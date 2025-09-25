import { Person } from '../../../pages/models/people/person.interface';

export const mockCast: Person[] = [
  {
    id: 101,
    name: 'Bryan Cranston',
    profile_path: '/cranston.jpg',
    known_for_department: 'Acting',
    popularity: 85.3,
    character: 'Walter White',
    known_for: [
      {
        id: 1,
        title: 'Breaking Bad',
        poster_path: '/bb.jpg',
        media_type: 'tv',
        first_air_date: '2008-01-20',
      },
      {
        id: 2,
        title: 'Trumbo',
        poster_path: '/trumbo.jpg',
        media_type: 'movie',
        release_date: '2015-11-06',
      },
    ],
  },
  {
    id: 102,
    name: 'Aaron Paul',
    profile_path: '/paul.jpg',
    known_for_department: 'Acting',
    popularity: 74.1,
    character: 'Jesse Pinkman',
    known_for: [
      {
        id: 3,
        title: 'El Camino',
        poster_path: '/elcamino.jpg',
        media_type: 'movie',
        release_date: '2019-10-11',
      },
      {
        id: 4,
        title: 'Westworld',
        poster_path: '/westworld.jpg',
        media_type: 'tv',
        first_air_date: '2016-10-02',
      },
    ],
  },
];
