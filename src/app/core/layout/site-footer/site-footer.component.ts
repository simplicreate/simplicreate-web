import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  templateUrl: './site-footer.component.html',
})
/**
 * Site footer component that displays copyright information.
 */
export class SiteFooterComponent {
  /** Current year for copyright display */
  year = new Date().getFullYear();
}
