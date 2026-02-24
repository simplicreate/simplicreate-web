import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { SectionTitleComponent } from '../../shared/components/section-title.component';
import { ContentService } from '../../core/sanity/content.service';


import type {
  SiteSettings,
  FaqItem,
  ContactSettings,
  Engagement as CmsEngagement,
} from '../../core/sanity/content.service';

import { PROJECTS } from '../../data/projects.data';

type CircuitStep = {
  name: string;
  description: string;
};

// ---- Fallback engagements (keeps UI stable if CMS has no data) ----
// NOTE: This is intentionally validated against the CMS Engagement type.
const FALLBACK_ENGAGEMENTS = [
  {
    id: 'patch',
    name: 'Stability Patch',
    subtitle: 'Small, focused fix — fast turnaround',
    priceLine: 'Once-off micro-engagement',
    description:
      'Target a specific instability: broken forms, DNS/SSL issues, performance regressions, deploy failures, or security misconfig.',
    bullets: [
      'Triage + isolate the failure point',
      'Fix + verify (with rollback safety)',
      'Baseline performance/security checks',
      'Handoff notes so it stays fixed',
    ],
    highlight: false,
    order: 1,
  },
  {
    id: 'launchpad',
    name: 'The Launchpad',
    subtitle: 'One-time setup + stabilisation',
    priceLine: 'Once-off engagement',
    description:
      'Fix critical issues, harden infrastructure, and standardise deployments so the system becomes reliable.',
    bullets: [
      'Fix critical breakages + stabilise uptime',
      'Performance + SEO baseline improvements',
      'Cloudflare sanity check (DNS/SSL/WAF)',
      'Repeatable deploy pipeline (clean rollbacks)',
    ],
    highlight: true,
    order: 2,
  },
  {
    id: 'operator',
    name: 'The Operator',
    subtitle: 'Monthly reliability operations',
    priceLine: 'Monthly engagement',
    description:
      'Ongoing reliability + improvements. We run the system so you don’t lose leads to downtime, slowness, or broken deployments.',
    bullets: [
      'Monitoring, updates, backups, dependency hygiene',
      'Security hardening + incident prevention',
      'Speed + SEO maintenance (rankings + conversions)',
      'Optional automation circuits (The Circuit)',
    ],
    highlight: false,
    order: 3,
  },
] satisfies CmsEngagement[];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, SectionTitleComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // ---- CMS-driven content ----
  siteSettings: SiteSettings | null = null;
  faq: FaqItem[] = [];
  contactSettings: ContactSettings | null = null;

  // ---- Fallback content (keeps UI stable) ----
  projects = PROJECTS;

  readonly fallbackHero: Required<
    Pick<
      SiteSettings,
      | 'brandLabel'
      | 'heroHeadline'
      | 'heroSubheadline'
      | 'ctaPrimaryText'
      | 'ctaPrimaryHref'
      | 'ctaSecondaryText'
      | 'ctaSecondaryHref'
      | 'contactEmail'
    >
  > = {
    brandLabel: 'SimpliCreate',
    heroHeadline: 'We engineer the digital infrastructure your business runs on.',
    heroSubheadline: 'Reliability, speed, and automation — standardised.',
    ctaPrimaryText: 'Activate Infrastructure',
    ctaPrimaryHref: '#engagements',
    ctaSecondaryText: 'View Engagements',
    ctaSecondaryHref: '#engagements',
    contactEmail: 'hello@simplicreate.tech',
  };

  // ---- Engagements (CMS overrides fallback when available) ----
  engagements: CmsEngagement[] = FALLBACK_ENGAGEMENTS;

  getEngagementTag(e: CmsEngagement): string | null {
    if (e.highlight) return 'Recommended';

    switch (e.id) {
      case 'patch':
        return 'Start Here';
      case 'operator':
        return 'Monthly';
      default:
        return null;
    }
  }

  readonly circuitSteps: CircuitStep[] = [
    { name: 'Capture', description: 'Leads enter via forms, WhatsApp, email, or landing pages.' },
    {
      name: 'Route',
      description: 'Auto-sort to the right pipeline (sales/support), with labels + owners.',
    },
    {
      name: 'Onboard',
      description: 'Auto-checklists, access requests, and handoff steps triggered immediately.',
    },
    {
      name: 'Deploy',
      description: 'Standardised deployments with safety rails and rollback paths.',
    },
    {
      name: 'Operate',
      description: 'Monitoring, updates, backups, and reliability improvements as a routine.',
    },
  ];

  readonly circuitExample = {
    title: 'Example circuit',
    line: 'Lead capture → Notion board → auto-reply email → onboarding checklist',
  };

  // ---- Engagement highlight state (hover / focus / tap) ----
  activeEngagementId: CmsEngagement['id'] = 'patch';

  setActive(id: CmsEngagement['id']) {
    this.activeEngagementId = id;
  }

  // ---- Contact form ----
  submitting = false;
  submitSuccess = false;
  submitError = '';

  contactForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    // Honeypot field: humans leave empty, bots often fill it
    website: new FormControl<string>('', {
      nonNullable: true,
    }),
  });

  constructor(
    private content: ContentService,
    private http: HttpClient,
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const s = await this.content.getSiteSettings();
      if (s) this.siteSettings = s;

      const sanityProjects = await this.content.getProjects();
      if (sanityProjects.length) this.projects = sanityProjects;

      const f = await this.content.getFaq();
      this.faq = f;

      const cs = await this.content.getContactSettings();
      this.contactSettings = cs;
    } catch (e) {
      console.error('Sanity fetch failed (using fallback):', e);
    }

    // Engagements: override fallback only when CMS returns data
    try {
      const sanityEngagements = await this.content.getEngagements();
      if (sanityEngagements.length) {
        this.engagements = sanityEngagements;
        this.activeEngagementId = sanityEngagements[0]?.id || 'patch';
      }
    } catch (e) {
      console.error('Engagement fetch failed (using fallback):', e);
    }
  }

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }

  onSubmit() {
    this.submitError = '';
    this.submitSuccess = false;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const v = this.contactForm.getRawValue();

      // Honeypot: silently succeed
  if ((v.website ?? '').trim().length > 0) {
    this.submitting = false;
    this.submitSuccess = true;
    this.contactForm.reset();
    return;
  }

    const payload = {
      name: v.name,
      email: v.email,
      message: v.message,
      website: v.website, // Honeypot field included in payload for server-side bot detection 
    };

    this.http
      .post<{ success: boolean; message?: string }>('/api/contact', payload)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: () => {
          this.submitSuccess = true;
          this.submitError = '';
          this.contactForm.reset();
        },
        error: () => {
          this.submitSuccess = false;
          this.submitError = 'Something went wrong sending your message. Please try again.';
        },
      });
  }
}