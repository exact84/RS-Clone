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
      },
      {
        path: 'movies/:id',
        loadComponent: () => import('./pages/movie/movie').then((c) => c.Movie),
      },
      {
        path: 'people',
        loadComponent: () => import('./pages/people/people').then((c) => c.People),
      },
      {
        path: 'people/:id',
        loadComponent: () => import('./pages/people/people').then((c) => c.People),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((c) => c.Profile),
        canMatch: [authGuard],
      },
      {
        path: 'favourites',
        loadComponent: () => import('./pages/favourites/favourites').then((c) => c.Favourites),
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
  },
];
