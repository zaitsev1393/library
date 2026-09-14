import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@org/layout').then((m) => m.LayoutComponent),
    loadChildren: () => import('@org/layout').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
