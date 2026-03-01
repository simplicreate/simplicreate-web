import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


export interface GoldenFeature {
  title: string;
  description: string;
  engineRoomLabel: string;
  engineRoomDetails: string;
}

@Component({
  selector: 'app-golden-path',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './golden-path.component.html'
})
export class GoldenPathComponent {
  @Input() features: GoldenFeature[] | null = null;
  @Input() headline: string = 'The Golden Path Infrastructure';
  @Input() subheadline: string = "A proven, standardised setup we deploy for every client. We don't guess—we use a repeatable playbook so your website is secure, lightning-fast, and never goes down during an update. ";

  fallbackFeatures: GoldenFeature[] = [
    {
      title: 'Domains work instantly',
      description: 'No more broken links or "www" errors. Your site resolves perfectly and instantly everywhere in the world.',
      engineRoomLabel: 'The Engine Room',
      engineRoomDetails: 'Cloudflare DNS, clean redirect strategy, DNS hygiene. So your site loads for everyone, everywhere, first try'
    },
    {
      title: 'Protected from attacks',
      description: 'Enterprise-grade edge security blocks malicious bots and vulnerabilities before they ever reach your site.',
      engineRoomLabel: 'The Engine Room',
      engineRoomDetails: 'Cloudflare SSL, WAF, Edge Security Controls. So hackers and bots never reach your actual site'

    },
    {
      title: 'Zero-downtime updates',
      description: 'Changes are tested and deployed seamlessly. If something unexpected happens, we can roll back instantly.',
      engineRoomLabel: 'The Engine Room',
      engineRoomDetails: 'GitHub Version Control, CI/CD Pipeline, Vercel Hosting. So a new update never breaks your live site'
    },
    {
      title: 'Lightning-fast UX',
      description: 'Faster pages mean better Google rankings and higher lead conversions. We strip out the unnecessary bloat.',
      engineRoomLabel: 'The Engine Room',
      engineRoomDetails: 'Angular Standalone, Tailwind CSS, Image Optimisation. So pages load before a visitor loses patience'
    },
    {
      title: 'Easy content updates',
      description: 'No clunky, outdated dashboards. You get a clean, tailored interface to update your content safely.',
      engineRoomLabel: 'The Engine Room',
      engineRoomDetails: 'Sanity Headless CMS, Typed GROQ API, Code Fallbacks. So you change text and images without calling a developer'
    },
    {
      title: 'Emails hit the inbox',
      description: "We configure your domain's trust records so your proposals and support replies don't end up in spam.",
      engineRoomLabel: 'The Engine Room',
      engineRoomDetails: "Google / M365, SPF, DKIM, DMARC Authentication.  your quotes and replies don't land in spam"
    }
  ];

  // The clean logic handler for the HTML template
  get displayFeatures(): GoldenFeature[] {
    return this.features && this.features.length > 0 ? this.features : this.fallbackFeatures;
  }
}