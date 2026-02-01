import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [NgFor],
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  nav = [
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Work', href: '#work' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];
}
