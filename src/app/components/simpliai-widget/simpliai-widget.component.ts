import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simpliai-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simpliai-widget.component.html',
})
export class SimpliaiWidgetComponent {
  isModalOpen: boolean = false;
  userEmail: string = '';
  isSubmitted: boolean = false;

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    if (this.isModalOpen) this.isSubmitted = false; 
  }

  async joinWaitlist(): Promise<void> {
    if (!this.userEmail) return;

    try {
      // Calls the serverless function we architected for Phase 1
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: this.userEmail, 
          source: 'simpliai_waitlist' 
        })
      });

      if (response.ok) {
        this.isSubmitted = true;
        this.userEmail = '';
        
        // Auto-close modal after 3 seconds to clear the UI
        setTimeout(() => {
          this.isModalOpen = false;
        }, 3000);
      }
    } catch (error) {
      console.error('SimpliAi Widget Telemetry Failure:', error);
    }
  }
}