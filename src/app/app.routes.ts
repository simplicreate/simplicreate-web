import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ContentService } from './core/sanity/content.service'; // (Adjust path if needed)

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // THE BOUNCER: Forces the server to fetch data before loading the component
    resolve: {
      homeData: () => inject(ContentService).getFullHomeData()
    }
  }
];