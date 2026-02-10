import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

import { SectionTitleComponent } from '../../shared/components/section-title.component';
import { environment } from '../../../environments/environment';

import { ContentService } from '../../core/sanity/content.service';
import type { SiteSettings, FaqItem, ContactSettings } from '../../core/sanity/content.service';

import { SERVICES } from '../../data/services.data';
import { PROJECTS } from '../../data/projects.data';
import { PACKAGES } from '../../data/packages.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, SectionTitleComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // Fallback content
  services = SERVICES;
  projects = PROJECTS;
  packages = PACKAGES;
  // Sanity-driven content
  siteSettings: SiteSettings | null = null;
  faq: FaqItem[] = [];
  contactSettings: ContactSettings | null = null;

  private readonly FORM_ENDPOINT = 'https://formspree.io/f/xjgopngn';

  submitting = false;
  submitSuccess = false;
  submitError = '';

  contactForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  constructor(
    private content: ContentService,
    private http: HttpClient,
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('[HomeComponent] ngOnInit: fetching content from Sanity');
    console.log('[Home] env.sanity.projectId:', environment.sanity.projectId);
    console.log('[Home] env.sanity.enabled:', this.content.enabled);
    try {
      const sanityServices = await this.content.getServices();
      if (sanityServices.length) this.services = sanityServices;

      const sanityProjects = await this.content.getProjects();
      if (sanityProjects.length) this.projects = sanityProjects;

      const s = await this.content.getSiteSettings();
      if (s) this.siteSettings = s;
      const f = await this.content.getFaq();
      console.log('[Home] FAQ fetched:', f.length, f);
      this.faq = f;

      const cs = await this.content.getContactSettings();
      console.log('[Home] Contact fetched:', cs);
      this.contactSettings = cs;
    } catch (e) {
      console.error('Sanity fetch failed (using fallback):', e);
    }
  }

  // ---- Form helpers ----
  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }

  // ---- Form submit ----
  onSubmit() {
    this.submitError = '';
    this.submitSuccess = false;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const payload = this.contactForm.getRawValue();

    this.http
      .post(this.FORM_ENDPOINT, payload, {
        headers: { Accept: 'application/json' },
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.submitSuccess = true;
          this.contactForm.reset();
        },
        error: () => {
          this.submitting = false;
          this.submitError = 'Something went wrong sending your message. Please try again.';
        },
      });
  }
}
