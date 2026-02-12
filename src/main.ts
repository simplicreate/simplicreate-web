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
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient()
  ]
})
  .catch((err) => console.error(err));
