import { Routes } from '@angular/router';
import { About } from './features/about/about';

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
        loadComponent: () => import('./features/catalog-movies/movie-board/movie-board').then(component => component.MovieBoard)
    },
    {
        path: 'about',
        component: About
    }
];
