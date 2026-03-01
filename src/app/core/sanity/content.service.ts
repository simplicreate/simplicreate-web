import { Injectable } from '@angular/core';
import { sanityClient, sanityEnabled } from './sanity.client';
import { environment } from '../../../environments/environment';

// --- Interfaces ---
export interface Project {
  name: string;
  outcome: string;
  tags: string[];
}

export interface SiteSettings {
  brandLabel?: string;
  heroTagline?: string;      
  heroHeadline?: string;
  heroSubheadline?: string;
  heroBenefits?: string[];   
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  ctaTertiaryText?: string;
  ctaTertiaryHref?: string;
  contactEmail?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactSettings {
  submitLabel?: string;
  successMessage?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
}

export interface Engagement {
  id: string;
  name: string;
  subtitle: string;
  priceLine: string;
  description: string;
  bullets: string[];
  highlight?: boolean;
  order?: number;
}

// Interface for the Batched Response
export interface HomeData {
  siteSettings: SiteSettings;
  engagements: Engagement[];
  projects: Project[];
  faq: FaqItem[];
  contactSettings: ContactSettings;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  get enabled(): boolean {
    return !!environment?.sanity?.projectId;
  }

  private getClient() {
    if (!sanityEnabled || !sanityClient) {
      throw new Error('Sanity not configured: set environment.sanity.projectId');
    }
    return sanityClient;
  }

  /**
   * BATCHED MEGA-QUERY
   * Slashes latency by combining multiple trips into one.
   */
  async getFullHomeData(): Promise<HomeData> {
    const client = this.getClient();
    
    const query = `{
      "siteSettings": *[_type == "siteSettings"][0]{
        brandLabel, heroTagline, heroHeadline, heroSubheadline, heroBenefits,
        ctaPrimaryText, ctaPrimaryHref, ctaSecondaryText, ctaSecondaryHref,
        ctaTertiaryText, ctaTertiaryHref, contactEmail
      },
      "engagements": *[_type == "service"] | order(order asc){
        id, name, subtitle, priceLine, description, bullets, highlight, order
      },
      "projects": *[_type == "project"] | order(order asc){
        name, outcome, tags, order
      },
      "faq": *[_type == "faq"] | order(order asc){
        question, answer
      },
      "contactSettings": *[_type == "contactSettings"][0]{
        submitLabel, successMessage, nameLabel, namePlaceholder,
        emailLabel, emailPlaceholder, messageLabel, messagePlaceholder
      }
    }`;

    return await client.fetch<HomeData>(query);
  }
}