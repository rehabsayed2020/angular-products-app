import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './core/auth/services/user.service';
import { map } from 'rxjs/operators';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./core/auth/pages/login/login').then(m => m.Login),
    data: { hideHeader: true },
    canActivate: [() => inject(UserService).isAuthenticated.pipe(map(isAuth => !isAuth))],
  },

  {
    path: 'products',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/products/pages/product-list/product-list').then(m => m.ProductList),
        canActivate: [() => inject(UserService).isAuthenticated],
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/products/pages/product-details/product-details').then(m => m.ProductDetails),
        canActivate: [() => inject(UserService).isAuthenticated],
      },
    ],
  },
];
