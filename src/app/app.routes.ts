import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'players', pathMatch: 'full' },
  {
    path: 'players',
    loadComponent: () =>
      import('./features/players/players-list.component').then(
        (m) => m.PlayersListComponent,
      ),
  },
];
