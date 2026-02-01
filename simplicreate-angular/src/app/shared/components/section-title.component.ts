import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [NgIf],
  templateUrl: './section-title.component.html',
})
export class SectionTitleComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
