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
        loadComponent: () => import('./features/movies-catalog/movie-board/movie-board').then(component => component.MovieBoard)
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
