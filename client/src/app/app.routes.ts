import { Routes } from '@angular/router';
import { About } from './features/about/about';
import { PageNotFound } from './shared/components';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(component => component.Home)
    },
    {
        path: 'movies',
        loadComponent: () => import('./features/movies/movie-board/movie-board').then(component => component.MovieBoard)
    },
    {
        path: 'movies/:id',
        loadComponent: () => import('./features/movies/movie-details/movie-details').then(component => component.MovieDetails)
    },
    {
        path: 'add-movie',
        loadComponent: () => import('./features/add-movie/add-movie').then(component => component.AddMovie)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(component => component.Register)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(component => component.Login)
    },
    {
        path: 'about',
        component: About
    },
    {
        path: '**',
        component: PageNotFound
    }
];
