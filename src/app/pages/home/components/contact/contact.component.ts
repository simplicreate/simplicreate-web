import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionTitleComponent } from '../../../../shared/components/section-title.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionTitleComponent, ],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contactForm: FormGroup;
  submitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the form with basic validation
    this.contactForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  // FIXED: Default value is 'patch', Validators are in the second argument as an array
  engagementType: ['patch', [Validators.required]], 
  message: ['', Validators.required],
  website: [''], 
  source: ['website_form']
});
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
    this.contactForm.reset({ engagementType: 'patch', source: 'website_form' });
    setTimeout(() => this.submitSuccess = false, 5000);
  },
  error: (err) => {
    // Check if the data actually made it despite the error
    if (err.status === 200 || err.status === 201) {
       this.submitting = false;
       this.submitSuccess = true;
       this.contactForm.reset();
    } else {
       this.submitting = false;
       this.submitError = 'System error. Please email hello@simplicreate.tech directly.';
       console.error('Submission Error:', err);
    }
  }
});
  }
}