import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

if (typeof window !== 'undefined') {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  if (window.location.hash) {
    history.replaceState(
      null,
      document.title,
      window.location.pathname + window.location.search
    );
  }

  window.scrollTo(0, 0);
}

bootstrapApplication(AppComponent, {
  // Use empty object as fallback if appConfig is missing
  ...(appConfig || {}), 
  providers: [
    // Use empty array as fallback if providers is missing
    ...(appConfig?.providers || []), 
    provideHttpClient()
  ]
})
  .catch((err) => console.error(err));
