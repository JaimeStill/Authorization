import { Route } from '@angular/router';

import { UsersComponent } from './children/users.component';
import { UserRolesComponent } from './children/user-roles.component';

export const ConfigComponents = [
  UsersComponent,
  UserRolesComponent
];

export const ConfigRoutes: Route[] = [
  { path: 'users', component: UsersComponent },
  { path: 'user-roles', component: UserRolesComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users', pathMatch: 'full' }
];
