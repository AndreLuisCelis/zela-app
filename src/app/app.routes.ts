import { Routes } from '@angular/router';

export const routes: Routes = [
  { loadComponent: () => import('./pages/home/home').then(m => m.Home), path: 'home' }, { loadComponent: () => import('./pages/home/home').then(m => m.Home), path: '' },
];
