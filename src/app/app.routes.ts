// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.route').then( m => m.AUTH_ROUTE),
    // canActivate: [noAuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./pages/main/main.route').then( m => m.MAIN_ROUTE),
    // canActivate: [authGuard]
  },
  {
    path:'admin',
    loadChildren: () => import('./pages/admin/admin.route').then( m => m.ADMIN_ROUTE),
    // canActivate: [authGuard, adminGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
