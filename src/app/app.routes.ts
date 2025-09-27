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
      { path: 'home', component: Home },
      {
        path: 'movies',
        loadComponent: () => import('./pages/movies/movies').then((c) => c.Movies),
        children: [
          { path: '', redirectTo: '/popular', pathMatch: 'full' },
          {
            path: 'popular',
            loadComponent: () =>
              import('./pages/movies/popular-movies/popular-movies').then((c) => c.PopularMovies),
            data: { category: 'popular' },
          },
          {
            path: 'now-playing',
            loadComponent: () =>
              import('./pages/movies/popular-movies/popular-movies').then((c) => c.PopularMovies),
            data: { category: 'popular' },
          },
          {
            path: 'filter',
            loadComponent: () =>
              import('./pages/movies/movie-search-filter/movie-search-filter').then(
                (c) => c.MovieSearchFilter,
              ),
          },
          {
            path: 'search',
            loadComponent: () =>
              import('./pages/movies/movie-search/movie-search').then((c) => c.MovieSearch),
          },
        ],
      },
      {
        path: 'people/person',
        loadComponent: () => import('./pages/people/people').then((c) => c.People),
      },
      {
        path: 'person/:id',
        loadComponent: () =>
          import('./features/person-details/person-details').then((c) => c.PersonDetails),
      },
      {
        path: 'details/:type/:id',
        loadComponent: () =>
          import('./features/movie-details/movie-details').then((c) => c.MovieDetails),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((c) => c.Profile),
        canMatch: [authGuard],
      },
      {
        path: 'favourites',
        loadComponent: () => import('./pages/favourites/favourites').then((c) => c.Favourites),
        canMatch: [authGuard],
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
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/forms/login-form/login-form').then((c) => c.LoginForm),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((c) => c.NotFound),
    data: { fallback: true },
  },
];
