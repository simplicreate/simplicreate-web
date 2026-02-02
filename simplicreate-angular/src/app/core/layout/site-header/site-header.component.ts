import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [NgFor],
  templateUrl: './site-header.component.html',
})
/**
 * Site header component that displays the navigation menu.
 * Contains links to different sections of the site.
 */
export class SiteHeaderComponent {
  /** Navigation items for the header menu */
  nav = [
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Work', href: '#work' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];
}
