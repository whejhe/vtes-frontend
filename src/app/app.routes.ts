// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.route').then( m => m.AUTH_ROUTE)
  },
  {
    path: '',
    loadChildren: () => import('./pages/main/main.route').then( m => m.MAIN_ROUTE)
  },
  {
    path:'admin',
    loadChildren: () => import('./pages/admin/admin.route').then( m => m.ADMIN_ROUTE)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
