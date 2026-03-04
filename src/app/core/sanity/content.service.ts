import { Injectable, inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { isPlatformServer } from '@angular/common';
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

// 1. Create the unique cache key for your batched query
const HOME_DATA_KEY = makeStateKey<HomeData>('home-data-cache');

@Injectable({ providedIn: 'root' })
export class ContentService {
  
  // 2. Inject Angular's platform and transfer state tools
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);

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
   * Now with TransferState to completely eliminate the client-side double fetch!
   */
  async getFullHomeData(): Promise<HomeData> {
    
    // 3. Client Check: Does the HTML already contain the server-rendered Sanity data?
    if (this.transferState.hasKey(HOME_DATA_KEY)) {
      const cachedData = this.transferState.get(HOME_DATA_KEY, null);
      if (cachedData) {
        return cachedData; // Return instantly! No network call.
      }
    }

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

    // 4. Fetch the data normally
    const data = await client.fetch<HomeData>(query);

    // 5. Server Check: If the Vercel server is running this, save the JSON directly into the HTML
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(HOME_DATA_KEY, data);
    }

    return data;
  }
}