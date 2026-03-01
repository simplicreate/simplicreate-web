import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteSettings } from '../../../../core/sanity/content.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  // Expects the Sanity data from the parent (HomeComponent)
  @Input() siteSettings!: SiteSettings;

  // The "Protect & Grow" Fallback Copy
  fallbackHero = {
    heroTagline: 'Web Ops & Infrastructure',
    heroHeadline: 'Bulletproof Web Operations for South African SMEs.',
    heroSubheadline: 'We build, secure, and manage high-performance websites so you can stop worrying about downtime and start converting more traffic. No slow pages, no broken forms, no lost leads.',
    heroBenefits: [
      'Zero-Downtime CI/CD Deployments',
      'Enterprise-Grade Cloudflare Edge Security',
      'Automated Lead Routing to your CRM'
    ],
    ctaPrimaryHref: 'https://cal.com/yourname/15min', // Update this to your link later
    ctaPrimaryText: 'Book a Tech Audit',
    ctaSecondaryText: 'View Infrastructure',
    ctaSecondaryHref: '#services' 
  };
}