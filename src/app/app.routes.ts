import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MainLayout } from './layouts/main-layout/main-layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: Home,
        data: { title: 'RS Clone  MovieDB' },
        title: 'RS Clone  MovieDB'
      },
      {
        path: 'movies',
        loadComponent: () => import('./pages/movies/movies').then((c) => c.Movies),
        children: [
          { path: '', redirectTo: '/popular', pathMatch: 'full' },
          {
            path: 'popular',
            loadComponent: () =>
              import('./pages/movies/popular-movies/popular-movies').then((c) => c.PopularMovies),
            data: { title: 'Popular' },
            title: 'Popular',
          },
          {
            path: 'now-playing',
            loadComponent: () =>
              import('./pages/movies/now-playing/now-playing').then((c) => c.NowPlaying),
            data: { title: 'Now playing' },
            title: 'Now Playing',
          },
          {
            path: 'top-rated',
            loadComponent: () =>
              import('./pages/movies/top-rated/top-rated').then((c) => c.TopRated),
            data: { title: 'Top Rated' },
            title: 'Top Rated',
          },
          {
            path: 'upcoming',
            loadComponent: () => import('./pages/movies/upcoming/upcoming').then((c) => c.Upcoming),
            data: { title: 'Upcoming' },
            title: 'Upcoming',
          },
          {
            path: 'filter',
            loadComponent: () =>
              import('./pages/movies/movie-search-filter/movie-search-filter').then(
                (c) => c.MovieSearchFilter,
              ),
            title: 'Filter',
          },
          {
            path: 'search',
            loadComponent: () =>
              import('./pages/movies/movie-search/movie-search').then((c) => c.MovieSearch),
            title: 'Search',
          },
        ],
      },
      {
        path: 'people/person',
        loadComponent: () => import('./pages/people/people').then((c) => c.People),
        title: 'Persons',
      },
      {
        path: 'person/:id',
        loadComponent: () =>
          import('./features/person-details/person-details').then((c) => c.PersonDetails),
        title: 'Person',
      },
      {
        path: 'details/:type/:id',
        loadComponent: () =>
          import('./features/movie-details/movie-details').then((c) => c.MovieDetails),
        title: 'Movie',
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((c) => c.Profile),
        canMatch: [authGuard],
        title: 'Profile',
      },
      {
        path: 'favourites',
        loadComponent: () => import('./pages/favourites/favourites').then((c) => c.Favourites),
        canMatch: [authGuard],
        title: 'Favourites',
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth').then((c) => c.Auth),
    canMatch: [authGuard],
    children: [
      { path: '', redirectTo: 'signup', pathMatch: 'full' },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/forms/signup-form/signup-form').then((c) => c.SignupForm),
        title: 'Sign Up',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/forms/login-form/login-form').then((c) => c.LoginForm),
        title: 'Log In',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((c) => c.NotFound),
    data: { fallback: true },
    title: 'Page not found',
  },
];
