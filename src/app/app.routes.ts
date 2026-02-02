import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

/**
 * Application routes configuration.
 * Defines the routing for the home page and wildcard redirect.
 */
export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
