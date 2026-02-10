import { Component, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  nav = [
  { label: 'Engagements', href: '#engagements' },
  { label: 'The Circuit', href: '#circuit' },
  { label: 'Solutions Archive', href: '#solutions' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // ✅ Close the menu if the user scrolls (mobile-friendly)
  @HostListener('window:scroll')
  onScroll() {
    if (this.isMenuOpen) this.closeMenu();
  }
}
