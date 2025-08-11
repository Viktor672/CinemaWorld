import { Routes } from '@angular/router';
import { About } from './features/about/about';
import { PageNotFound } from './shared/components';
import { authGuard } from './core/guards/auth.guard';
import { movieOwnerGuard } from './core/guards/movie-owner.guard';
import { guestGuard } from './core/guards/guest.guard';

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
        path: 'movies/:id/edit',
        loadComponent: () => import('./features/edit-movie/edit-movie').then(component => component.EditMovie),
        canActivate: [movieOwnerGuard]
    },
    {
        path: 'add-movie',
        loadComponent: () => import('./features/add-movie/add-movie').then(component => component.AddMovie),
        canActivate: [authGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(component => component.Register),
        canActivate: [guestGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(component => component.Login),
        canActivate: [guestGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile').then(component => component.Profile),
        canActivate: [authGuard]
    },
    {
        path: 'about',
        component: About
    },
    {
        path: 'page-not-found',
        loadComponent: () => import('./shared/components/page-not-found/page-not-found').then(component => component.PageNotFound)
    },
    {
        path: '**',
        component: PageNotFound
    }
];
