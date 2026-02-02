import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [NgIf],
  templateUrl: './section-title.component.html',
})
/**
 * Reusable component for displaying section titles with optional subtitles.
 */
export class SectionTitleComponent {
  /** The main title text to display */
  @Input() title = '';
  /** The optional subtitle text to display */
  @Input() subtitle = '';
}
