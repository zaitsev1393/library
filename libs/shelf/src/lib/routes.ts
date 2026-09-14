import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'list',
    loadComponent: () =>
      import('./list/list.component').then((m) => m.ListComponent),
  },
  {
    path: 'grid',
    loadComponent: () =>
      import('./grid/grid.component').then((m) => m.GridComponent),
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
