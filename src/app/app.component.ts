import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// 1. Import the Vercel inject function
import { inject } from '@vercel/analytics';

import { SimpliaiWidgetComponent } from './components/simpliai-widget/simpliai-widget.component';

import { SiteHeaderComponent } from './core/layout/site-header/site-header.component';
import { SiteFooterComponent } from './core/layout/site-footer/site-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent, SimpliaiWidgetComponent],
  templateUrl: './app.component.html',
})
/**
 * Main application component that serves as the root component.
 * It includes the router outlet and layout components like header and footer.
 */
export class AppComponent implements OnInit {
  title = 'simplicreate';

  // 2. Fire it when the app starts
  ngOnInit() {
    inject();
  }
}
