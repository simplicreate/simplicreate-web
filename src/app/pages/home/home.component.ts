import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { SectionTitleComponent } from '../../shared/components/section-title.component';
import { ContentService } from '../../core/sanity/content.service';
import { environment } from '../../../environments/environment';


import type {
  SiteSettings,
  FaqItem,
  ContactSettings,
  Engagement as CmsEngagement,
} from '../../core/sanity/content.service';

import { PROJECTS } from '../../data/projects.data';

type CircuitStep = { name: string; description: string; };

// ---- Fallback engagements (keeps UI stable if CMS has no data) ----
// NOTE: This is intentionally validated against the CMS Engagement type.
const FALLBACK_ENGAGEMENTS = [
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
    name: 'Stabilise & Harden',
    subtitle: 'We clean up your setup and make it reliable.',
    priceLine: 'Once-off engagement',
    description: 'Fix critical breakages, harden infrastructure, and standardise deployments.',
    bullets: [
      'Baseline performance and technical SEO improvements',
      'Harden Cloudflare (DNS/SSL/WAF) to reduce risk',
      'Set up a clean deployment pipeline with safe rollbacks'
    ],
    highlight: true,
    order: 2,
  },
  {
    id: 'operator',
    name: 'Managed Ops (Monthly)',
    subtitle: 'We run the technical side so you don’t lose leads.',
    priceLine: 'Monthly engagement',
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
    answer: 'We’re an infrastructure and operations partner. We don’t focus on "designing pages"; we focus on keeping your website and systems stable, secure, fast, and easy to change safely.'
  },
  {
    question: 'Do you provide hosting?',
    answer: 'We can manage hosting on your behalf (using reputable modern platforms), or work with your existing host. The goal is reliability and clear ownership—no finger-pointing when something breaks.'
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
  imports: [NgFor, NgIf, SectionTitleComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  siteSettings: SiteSettings | null = null;
  faq: FaqItem[] = FALLBACK_FAQ;
  contactSettings: ContactSettings | null = null;
  projects = PROJECTS;
  engagements: CmsEngagement[] = FALLBACK_ENGAGEMENTS;
  activeEngagementId: string = 'patch';

  readonly fallbackHero = {
    brandLabel: 'SimpliCreate',
    heroHeadline: 'Managed website & cloud infrastructure for South African SMEs.',
    heroSubheadline: 'We keep your website, email and cloud systems online, secure, and fast—handling monitoring, security, backups, DNS/SSL, and reliable deployments.',
    ctaPrimaryText: 'Book a 15-minute call',
    ctaPrimaryHref: '#contact',
    ctaSecondaryText: 'See services',
    ctaSecondaryHref: '#services',
    contactEmail: 'hello@simplicreate.tech',
  };

  readonly circuitSteps: CircuitStep[] = [
    { name: 'Route', description: 'Route leads from WhatsApp/forms into a pipeline with owners + labels.' },
    { name: 'Auto-reply', description: 'Auto-reply to new enquiries and trigger an onboarding checklist.' },
    { name: 'Handoffs', description: 'Create repeatable handoffs (sales → ops → support) with fewer mistakes.' },
    { name: 'Notify', description: 'Notify you immediately when forms fail, domains expire, or SSL breaks.' },
  ];

  submitting = false;
  submitSuccess = false;
  submitError = '';

  contactForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    message: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    website: new FormControl('', { nonNullable: true }), // Honeypot
  });

  constructor(private content: ContentService, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    try {
      const [s, sanityProjects, f, cs, sanityEngagements] = await Promise.all([
        this.content.getSiteSettings(),
        this.content.getProjects(),
        this.content.getFaq(),
        this.content.getContactSettings(),
        this.content.getEngagements()
      ]);

      if (s) this.siteSettings = s;
      if (sanityProjects?.length) this.projects = sanityProjects;
      if (f?.length) this.faq = f;
      if (cs) this.contactSettings = cs;
      
      if (sanityEngagements?.length) {
        this.engagements = sanityEngagements;
        this.activeEngagementId = sanityEngagements[0]?.id || 'patch';
      }
    } catch (e) {
      console.error('CMS fetch failed. Using hardcoded SME fallbacks:', e);
    }
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

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

  onSubmit() {
  this.submitError = '';
  this.submitSuccess = false;

  if (this.contactForm.invalid) {
    this.contactForm.markAllAsTouched();
    return;
  }

  this.submitting = true;
  const v = this.contactForm.getRawValue();

<<<<<<< HEAD
  // Honeypot: silently succeed
  if ((v.website ?? '').trim().length > 0) {
    this.submitting = false;
    this.submitSuccess = true;
    this.contactForm.reset();
    return;
  }

  const payload = {
    access_key: environment.web3forms.accessKey,
    name: v.name,
    email: v.email,
    message: v.message,
    subject: 'New lead — SimpliCreate',
    from_name: 'SimpliCreate Website',
    // Optional: botcheck: true (Web3Forms reserved field)
  };

  this.http.post<any>(
    'https://api.web3forms.com/submit',
    payload,
    { headers: { Accept: 'application/json' } }  // Angular sets Content-Type: application/json automatically
  )
  .pipe(finalize(() => (this.submitting = false)))
  .subscribe({
    next: (res) => {
      // Web3Forms returns JSON; treat non-success as error
      if (res?.success) {
        this.submitSuccess = true;
        this.submitError = '';
        this.contactForm.reset();
      } else {
        this.submitSuccess = false;
        this.submitError = res?.message || 'Submission failed. Please try again.';
      }
    },
    error: (err) => {
      this.submitSuccess = false;
      this.submitError = err?.error?.message || 'Something went wrong sending your message. Please try again.';
    },
  });
}}
=======
    if ((v.website || '').trim().length > 0) {
      this.submitting = false;
      this.submitSuccess = true;
      this.contactForm.reset();
      return;
    }

    const payload = {
      access_key: environment.web3forms.accessKey,
      name: v.name,
      email: v.email,
      message: v.message,
      subject: 'New lead — SimpliCreate',
      from_name: 'SimpliCreate Website'
    };

    // 1. We tell the post method exactly what data shape to expect
    this.http.post<{ success: boolean; message?: string }>('https://api.web3forms.com/submit', payload, {
      headers: { 'Accept': 'application/json' }
    })
    .pipe(finalize(() => this.submitting = false))
    .subscribe({
      // 2. We remove the ': any' because TypeScript now knows 'res' matches the shape above
      next: (res) => {
        if (res.success) {
          this.submitSuccess = true;
          this.contactForm.reset();
        } else {
          this.submitError = res.message || 'Error sending message.';
        }
      },
      error: () => {
        this.submitError = 'Failed to connect. Please check your internet.';
      }
    });
  }
}
>>>>>>> design-refresh
