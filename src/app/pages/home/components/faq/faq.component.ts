import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';

export interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  templateUrl: './faq.component.html'
})
export class FaqComponent {
  @Input() faq: FaqItem[] | null = null;

  fallbackFaq: FaqItem[] = [
    {
      question: 'Do you offer monthly payment plans?',
      answer: 'Yes. For complete infrastructure rebuilds (The Launchpad), we require a 50% deposit with the balance due on completion. For ongoing maintenance (Managed Ops), it is a standard monthly retainer.'
    },
    {
      question: 'Will my website go down during a migration?',
      answer: 'No. We build your new infrastructure on a staging environment and thoroughly test it. When ready, we update your DNS records, resulting in a zero-downtime swap.'
    },
    {
      question: 'Do I really need the Cloudflare edge security?',
      answer: 'If you collect customer data, process leads, or rely on your website for revenue, yes. It stops automated bot attacks, DDoS attempts, and malicious logins before they even reach your server.'
    },
    {
      question: 'What happens if something breaks?',
      answer: 'If you are on our Managed Ops retainer, we monitor your site 24/7. If an issue occurs, we get alerted immediately and fix it, often before you or your customers even notice.'
    }
 
  ];

  // The clean logic handler for the HTML template
  get displayFaq(): FaqItem[] {
    return this.faq && this.faq.length > 0 ? this.faq : this.fallbackFaq;
  }
}