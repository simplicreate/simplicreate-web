import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';

export interface CircuitStep {
  name: string;
  description: string;
}

@Component({
  selector: 'app-automations',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent],
  templateUrl: './automations.component.html'
})
export class AutomationsComponent {
  @Input() circuitSteps: CircuitStep[] | null = null;

  fallbackSteps: CircuitStep[] = [
    {
      name: 'Lead Capture Routing',
      description: 'Website form submissions are instantly pushed into your CRM or Google Sheets.'
    },
    {
      name: 'Instant Auto-Replies',
      description: 'Customers receive branded confirmation emails the second they reach out.'
    },
    {
      name: 'Internal Notifications',
      description: 'Your team gets instantly pinged on Slack, Teams, or WhatsApp when a high-value action occurs.'
    },
    {
      name: 'Calendar Syncing',
      description: 'Booked consultations automatically generate meeting links and update your schedule.'
    }
  ];

  // The clean logic handler for the HTML template
  get displaySteps(): CircuitStep[] {
    return this.circuitSteps && this.circuitSteps.length > 0 ? this.circuitSteps : this.fallbackSteps;
  }
}