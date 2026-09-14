import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'library',
    loadComponent: () => import('@org/shelf').then((m) => m.ShelfComponent),
    loadChildren: () => import('@org/shelf').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'library',
  },
];
