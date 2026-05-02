import { Routes } from '@angular/router';
import { App } from './app';
import { Settings } from '../settings/settings';
import { Home } from '../home/home';
import { Placeholder } from '../placeholder/placeholder';

export const routes: Routes = [
    { 
        path: '', 
        component: App
    },
    {
        path: 'settings-page',
        component: Settings,
    },
    {
        path: 'home-page',
        component: Home,
    },
    {
        path: 'placeholder-page',
        component: Placeholder,
    },
];
