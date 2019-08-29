import { Route } from '@angular/router';
import { AdminCategoryComponent } from './children/admin-category.component';
import { AdminDataComponent } from './children/admin-data.component';

export const AdminComponents = [
  AdminCategoryComponent,
  AdminDataComponent
];

export const AdminRoutes: Route[] = [
  { path: 'categories', component: AdminCategoryComponent },
  { path: 'data', component: AdminDataComponent },
  { path: '', redirectTo: 'categories', pathMatch: 'prefix' },
  { path: '**', redirectTo: 'categories', pathMatch: 'prefix' }
];
