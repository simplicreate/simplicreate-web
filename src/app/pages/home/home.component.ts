import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

// Services
import { environment } from '../../../environments/environment';
import { ContentService } from '../../core/sanity/content.service';

// Child Components
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component'; // <-- Brought this back!
import { GoldenPathComponent } from './components/golden-path/golden-path.component';
import { AutomationsComponent } from './components/automations/automations.component';
import { DeploymentComponent } from './components/deployment/deployment.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import type {
  SiteSettings,
  FaqItem,
  ContactSettings,
  Engagement as CmsEngagement,
  HomeData,
} from '../../core/sanity/content.service';
import { SiteHeaderComponent } from '../../core/layout/site-header/site-header.component';


type CircuitStep = { name: string; description: string; };

const FALLBACK_ENGAGEMENTS: CmsEngagement[] = [
  {
    id: 'patch',
    name: 'Quick Fix (Once-off)',
    subtitle: 'A small, focused repair when something is broken or risky.',
    priceLine: 'Once-off engagement',
    description: 'Fix broken forms, email/DNS/SSL issues, deployment failures, or security misconfig.',
    bullets: [
      'Triage, fix, and verify (with rollback safety)',
      'Handover notes so it stays fixed'
    ],
    highlight: false,
    order: 1,
  },
  {
    id: 'launchpad',
    name: 'Secure Site Migration',
    subtitle: 'Move off fragile setups. Site stays fast, secure, and reliable.',
    priceLine: 'Once-off Setup',
    description: 'We migrate your website onto our modern Angular stack, harden your security, and set up safe, zero-downtime deployments.',
    bullets: [
      'Complete migration to our standard, high-performance stack.',
      'Speed & SEO baseline: metadata cleanup and image optimization.',
      'Cloudflare hardening: DNS/SSL/WAF and clean redirects.',
      'Standardized deployments: GitHub + safe rollbacks via Vercel.'
    ],
    highlight: true,
    order: 2,
  },
  {
    id: 'operator',
    name: 'Managed Ops (Monthly)',
    subtitle: 'We run the technical side so you don’t lose leads.',
    priceLine: 'Monthly Reliability',
    description: 'Ongoing reliability. We handle the monitoring and updates so you don’t experience downtime or slowness.',
    bullets: [
      'Monitoring, updates, backups, dependency hygiene',
      'Security hardening and incident prevention',
      'Performance maintenance (speed + conversion hygiene)',
      'Optional automations (handoffs, lead routing, onboarding)'
    ],
    highlight: false,
    order: 3,
  },
];

const FALLBACK_FAQ: FaqItem[] = [
  {
    question: 'What do you actually do—are you a web design company?',
    answer: 'We are an infrastructure partner. We don\'t focus on "designing pages"; we focus on keeping your website and systems stable, secure, fast, and easy to change safely.'
  },
  {
    question: 'Do you provide hosting?',
    answer: 'We manage professional hosting on your behalf or work with your existing host. Our goal is reliability and clear ownership—no finger-pointing when something breaks.'
  },
  {
    question: 'What is a "Secure Site Migration"?',
    answer: 'It is a one-time stabilisation and upgrade process. We migrate your website off fragile hosting (like old WordPress setups) and onto our modern, secure infrastructure. We fix critical performance issues, harden your security, and set up a clean deployment pipeline so your site becomes lightning-fast, stable, and fully owned by you.'
  },
  {
    question: 'Can you do small fixes without a full engagement?',
    answer: 'Yes—request a once-off quick fix. If you need ongoing care, we’ll recommend a monthly plan.'
  },
  {
    question: 'Can you work with our current developer or agency?',
    answer: 'Absolutely. We often act as the "engine room" that supports your creative team, handling the server-side operations while they focus on your brand.'
  }
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SiteHeaderComponent,
    HeroComponent,
    ServicesComponent,
    GoldenPathComponent,
    AutomationsComponent,
    DeploymentComponent,
    ProjectsComponent,
    FaqComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  loading = true;
  // 1. Fixed the variable names to match your HTML exactly!
  siteSettings: SiteSettings | null = null;
  services: CmsEngagement[] = []; // renamed from 'engagements'
  projects: any[] = [];
  faq: FaqItem[] = [];
  contactSettings: ContactSettings | any = null;
  activeEngagementId: string = 'patch';

  // Fallbacks...
  readonly fallbackHero = { /* your fallback data */ };
  readonly circuitSteps: CircuitStep[] = [ /* your steps */];

  constructor(
    private content: ContentService,
    private cdr: ChangeDetectorRef
  ) { }
  // 2. Removed the setTimeout so it fetches INSTANTLY
  async ngOnInit(): Promise<void> {
  try {
    const data: HomeData = await this.content.getFullHomeData();
    
    // Mapping the batched results to your component variables
    this.siteSettings = data.siteSettings;
    this.projects = data.projects;
    this.faq = data.faq.length > 0 ? data.faq : FALLBACK_FAQ;
    this.services = data.engagements.length > 0 ? data.engagements : FALLBACK_ENGAGEMENTS;
    this.contactSettings = data.contactSettings;

    this.loading = false;
    this.cdr.detectChanges();
  } catch (e) {
    this.loading = false;
    console.error('CMS fetch failed', e);
  }

    setTimeout(() => { 100 }); // <-- This is just to trigger change detection after the async call, you can remove it if not needed.
    // ... keep your helper functions below this line ..., 

  }

  getEngagementTag(e: CmsEngagement): string | null {
    if (e.highlight) return 'Recommended';
    switch (e.id) {
      case 'patch': return 'Start Here';
      case 'operator': return 'Monthly';
      default: return null;
    }
  }

  setActive(id: string) {
    this.activeEngagementId = id;
  }
  trackByEngagementId(index: number, engagement: CmsEngagement): string {
    return engagement.id;
  }


}
