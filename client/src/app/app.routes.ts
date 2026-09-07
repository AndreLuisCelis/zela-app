import { Routes } from '@angular/router';

export const routes: Routes = [
  { loadComponent: () => import('./pages/home/home').then(m => m.Home), path: 'home' },
  { loadComponent: () => import('./pages/report-detail-page/report-detail-page').then(m => m.ReportDetailPage), path: 'report/:id' },
  { loadComponent: () => import('./pages/home/home').then(m => m.Home), path: '' },
];
