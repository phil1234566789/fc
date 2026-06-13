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
  {
    path: 'ratings',
    loadComponent: () =>
      import('./features/ratings/ratings.component').then(
        (m) => m.RatingsComponent,
      ),
  },
  {
    path: 'team-builder',
    loadComponent: () =>
      import('./features/team-builder/team-builder.component').then(
        (m) => m.TeamBuilderComponent,
      ),
  },
  {
    path: 'audit-log',
    loadComponent: () =>
      import('./features/audit-log/audit-log.component').then(
        (m) => m.AuditLogComponent,
      ),
  },
];
