import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SERVICES } from '../../data/services.data';
import { PROJECTS } from '../../data/projects.data';
import { PACKAGES } from '../../data/packages.data';
import { SectionTitleComponent } from '../../shared/components/section-title.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, SectionTitleComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  services = SERVICES;
  projects = PROJECTS;
  packages = PACKAGES;

  private readonly FORM_ENDPOINT = 'https://formspree.io/f/xjgopngn';

  submitting = false;
  submitSuccess = false;
  submitError = '';

  contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
  });

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.submitError = '';
    this.submitSuccess = false;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (this.FORM_ENDPOINT.includes('REPLACE_ME')) {
      this.submitError = 'Contact form is not configured yet (missing Formspree endpoint).';
      return;
    }

    this.submitting = true;

    const payload = this.contactForm.getRawValue();

    this.http.post(this.FORM_ENDPOINT, payload, {
      headers: { Accept: 'application/json' },
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
      },
      error: () => {
        this.submitting = false;
        this.submitError = 'Something went wrong sending your message. Please try again.';
      }
    });
  }
}
