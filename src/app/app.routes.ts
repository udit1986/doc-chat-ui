import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core/auth/guards';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'docs',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/doc-manage/doc-list/doc-list.component').then((m) => m.DocListComponent),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
