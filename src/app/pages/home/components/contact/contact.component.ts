import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionTitleComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnChanges {
  // --- NEW: Receptor for the incoming service ID ---
  @Input() selectedService: string = ''; 

  contactForm: FormGroup;
  submitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the form with basic validation
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      engagementType: ['', [Validators.required]], 
      message: ['', Validators.required],
      website: [''], 
      source: ['website_form']
    });
  }

  // --- NEW: Watch for incoming clicks and update the dropdown ---
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedService'] && changes['selectedService'].currentValue) {
      this.contactForm.patchValue({
        engagementType: changes['selectedService'].currentValue
      });
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.submitError = 'Please fill out all required fields.';
      return;
    }

    // Basic honeypot check
    if (this.contactForm.value.website) {
      this.submitError = 'Spam detected.';
      return;
    }

    this.submitting = true;
    this.submitError = '';
    this.submitSuccess = false;

    const makeWebhookUrl = 'https://hook.eu1.make.com/4f9xc3bryuc910zww9npdxcz45h0wn7p';

    this.http.post(makeWebhookUrl, this.contactForm.value, { responseType: 'text' }).subscribe({
      next: () => {
        this.submitting = false;
        this.submitSuccess = true;
        this.submitError = ''; // Clear any previous errors
        
        // Slightly modified to reset to an empty string so it doesn't default to patch incorrectly
        this.contactForm.reset({ engagementType: '', source: 'website_form' });
        setTimeout(() => this.submitSuccess = false, 5000);
      },
      error: (err) => {
        // Check if the data actually made it despite the error
        if (err.status === 200 || err.status === 201) {
           this.submitting = false;
           this.submitSuccess = true;
           this.contactForm.reset({ engagementType: '', source: 'website_form' });
        } else {
           this.submitting = false;
           this.submitError = 'System error. Please email hello@simplicreate.tech directly.';
           console.error('Submission Error:', err);
        }
      }
    });
  }
}