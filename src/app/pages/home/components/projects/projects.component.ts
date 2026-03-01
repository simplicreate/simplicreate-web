import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';

export interface Project {
  name: string;
  outcome: string;
  tags: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  @Input() projects: Project[] | null = null;

  fallbackProjects: Project[] = [
    {
      name: 'E-Commerce Infrastructure Migration',
      outcome: 'Moved a high-traffic WooCommerce store to a stable architecture, reducing page load times by 75% and eliminating downtime during major sales.',
      tags: ['Angular', 'Sanity CMS', 'Vercel']
    },
    {
      name: 'B2B Lead Generation Automation',
      outcome: 'Built a custom circuit connecting a landing page directly to a CRM, Slack, and Sheets, saving the sales team 15 hours a week in manual entry.',
      tags: ['Make.com', 'Webhooks', 'API Integration']
    },
    {
      name: 'Corporate Website Stabilisation',
      outcome: 'Rescued a compromised site, audited plugins, implemented Cloudflare WAF, and set up automated daily backups to secure sensitive data.',
      tags: ['Security Audit', 'Cloudflare WAF', 'DNS Setup']
    },
    {
      name: 'SaaS Platform Landing Page',
      outcome: 'Designed and deployed a high-converting marketing site using Angular and Tailwind, achieving a perfect 100 Lighthouse performance score.',
      tags: ['Angular', 'Tailwind CSS', 'Performance']
    }
  ];

  // The clean logic handler for the HTML template
  get displayProjects(): Project[] {
    return this.projects && this.projects.length > 0 ? this.projects : this.fallbackProjects;
  }
}