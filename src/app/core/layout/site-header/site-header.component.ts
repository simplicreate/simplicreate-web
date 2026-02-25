import { Component, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  // Updated with the new SME-friendly labels and matching section IDs
  nav = [
    { label: 'Services', href: '#services' },
    { label: 'Automations', href: '#automations' },
    { label: 'Work', href: '#work' },
    { label: 'FAQ', href: '#faq' }
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