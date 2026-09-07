import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Shell global: header + rodapé em todas as páginas
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
      { path: 'report/:id', loadComponent: () => import('./pages/report-detail-page/report-detail-page').then(m => m.ReportDetailPage) },
    ]
  },
];
