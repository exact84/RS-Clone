import { MenuItem } from '../models/menu-item.interface';

export const MenuItems: MenuItem[] = [
  {
    text: 'Movies',
    route: '/movies',
    submenu: [
      { text: 'Popular', route: '/popular', submenu: undefined },
      { text: 'Now Playing', route: '/now-playing', submenu: undefined },
      { text: 'Upcoming', route: '/upcoming', submenu: undefined },
      { text: 'Top Rated', route: '/top-rated', submenu: undefined },
    ],
  },
  { text: 'People', route: '/people', submenu: [{ text: 'People', route: '/person' }] },
  {
    text: 'Filter',
    route: '',
    submenu: [{ text: 'Filter', route: '/movies/filter' }],
  },
];
