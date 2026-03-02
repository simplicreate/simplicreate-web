import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Engagement } from '../../../../core/sanity/content.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  @Input() services: Engagement[] = [];
  @Input() activeEngagementId: string = 'launchpad'; // Match your center card ID

  @Output() selectionChange = new EventEmitter<string>();

  hoveredId: string | null = null;

  // This makes the card "pop" when you hover, even before you click
  get visualActiveId(): string {
    return this.hoveredId ?? this.activeEngagementId;
  }

  getEngagementTag(e: Engagement): string | null {
    if (e.highlight) return 'Most Popular';
    switch (e.id) {
      case 'patch': return 'Give us a try';
      case 'operator': return 'Monthly Reliability';
      default: return null;
    }
  }

  setHovered(id: string | null) {
    this.hoveredId = id;
  }

  setActive(id: string) {
    this.selectionChange.emit(id);
  }
}