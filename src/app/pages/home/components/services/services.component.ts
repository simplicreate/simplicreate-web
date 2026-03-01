import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Engagement } from '../../../../core/sanity/content.service';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';

@Component({
  selector: 'app-services',
  standalone: true,
  // 1. Added SectionTitleComponent to imports so the HTML recognizes it
  imports: [CommonModule, SectionTitleComponent], 
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  @Input() services: Engagement[] = [];
  
  // 2. Renamed to activeEngagementId to match exactly what your HTML expects
  @Input() activeEngagementId: string = 'patch'; 

  @Output() selectionChange = new EventEmitter<string>();

  get displayEngagements(): Engagement[] {
    return this.services && this.services.length > 0 ? this.services : [];
  }

  // 3. Added this method because your HTML is calling it
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