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
        path: 'about',
        component: About
    }
];
