import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth').then((c) => c.Auth),
    children: [
      {
        path: 'signup',
        loadComponent: () => import('./pages/auth/signup/signup').then((c) => c.Signup),
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then((c) => c.Login),
      },
    ],
  },
  { path: 'movies', loadComponent: () => import('./pages/movies/movies').then((c) => c.Movies) },
  { path: 'movies/:id', loadComponent: () => import('./pages/movie/movie').then((c) => c.Movie) },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then((c) => c.Profile),
  },
  {
    path: 'favourites',
    loadComponent: () => import('./pages/favourites/favourites').then((c) => c.Favourites),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((c) => c.NotFound),
  },
];
