import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Engagement } from '../../../../core/sanity/content.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent], 
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  @Input() services: Engagement[] = [];
  // This is what the Home component will pass down to keep everything in sync
  @Input() activeEngagementId: string = 'patch'; 

  @Output() selectionChange = new EventEmitter<string>();

  // Use the @for or *ngFor loop variable, don't define 'e' here.
  
  getEngagementTag(e: Engagement): string | null {
    if (e.highlight) return 'Most Popular';
    switch (e.id) {
      case 'patch': return 'Give us a try';
      case 'operator': return 'Monthly Reliability';
      default: return null;
    }
  }

  setActive(id: string) {
    this.selectionChange.emit(id);
  }

  trackByEngagementId(index: number, engagement: Engagement): string {
    return engagement.id;
  }
}