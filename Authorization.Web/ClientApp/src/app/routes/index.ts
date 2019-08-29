import { Route } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { HomeComponent } from './home/home.component';
import { ExecutiveComponent } from './executive/executive.component';
import { TechComponent } from './tech/tech.component';
import { AdminComponent } from './admin/admin.component';
import { DeniedComponent } from './denied/denied.component';

import {
  AdminComponents,
  AdminRoutes
} from './admin';

import {
  ConfigComponents,
  ConfigRoutes
} from './config';

export const RouteComponents = [
  ConfigComponent,
  HomeComponent,
  ExecutiveComponent,
  TechComponent,
  AdminComponent,
  DeniedComponent,
  ...AdminComponents,
  ...ConfigComponents
];

export const Routes: Route[] = [
  { path: 'config', component: ConfigComponent, children: ConfigRoutes },
  { path: 'home', component: HomeComponent },
  { path: 'executive', component: ExecutiveComponent },
  { path: 'tech', component: TechComponent },
  { path: 'admin', component: AdminComponent, children: AdminRoutes },
  { path: 'denied', component: DeniedComponent },
  { path: '', redirectTo: 'config', pathMatch: 'full' },
  { path: '**', redirectTo: 'config', pathMatch: 'full' }
];
