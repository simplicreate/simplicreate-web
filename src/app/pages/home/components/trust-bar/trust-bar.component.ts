import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Industry {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-trust-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trust-bar.component.html'
})
export class TrustBarComponent {
  industries: Industry[] = [
    { icon: '🏗️', label: 'Construction' },
    { icon: '⚖️', label: 'Legal' },
    { icon: '🚛', label: 'Trucking & Logistics' },
    { icon: '🏠', label: 'Property' },
    { icon: '🏥', label: 'Health' },
    { icon: '🎓', label: 'Education' }
  ];
}