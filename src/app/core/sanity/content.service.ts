import { Injectable } from '@angular/core';
import { sanityClient, sanityEnabled } from './sanity.client';
import { environment } from '../../../environments/environment';

export interface Project {
  name: string;
  outcome: string;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon?: string;
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

interface ServiceDoc {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon?: string;
  order?: number;
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

interface EngagementDoc {
  id?: string;
  name?: string;
  subtitle?: string;
  priceLine?: string;
  description?: string;
  bullets?: string[];
  highlight?: boolean;
  order?: number;
}

interface ProjectDoc {
  name?: string;
  outcome?: string;
  tags?: string[];
  order?: number;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  get enabled(): boolean {
    // Convenience flag for templates/components.
    return !!environment?.sanity?.projectId;
  }

  private getClient() {
    if (!sanityEnabled || !sanityClient) {
      // Keeps UI running even before projectId is configured
      throw new Error('Sanity not configured: set environment.sanity.projectId');
    }
    return sanityClient;
  }

async getSiteSettings(): Promise<SiteSettings | null> {
    const client = this.getClient();
    return client.fetch(
      `*[_type == "siteSettings"][0]{
        brandLabel,
        heroTagline,      
        heroHeadline,
        heroSubheadline,
        heroBenefits,     
        ctaPrimaryText,
        ctaPrimaryHref,
        ctaSecondaryText,
        ctaSecondaryHref,
        ctaTertiaryText,
        ctaTertiaryHref,
        contactEmail
      }`,
    );
  }


  async getServices(): Promise<Service[]> {
    const client = this.getClient();

    const items = await client.fetch<ServiceDoc[]>(
      `*[_type == "service"]|order(order asc){
        "id": coalesce(id, _id),
        title,
        description,
        bullets,
        icon,
        order
      }`,
    );

    return (items ?? []).map((s) => ({
      id: s.id,
      title: s.title ?? '',
      description: s.description ?? '',
      bullets: s.bullets ?? [],
      icon: s.icon,
    }));
  }

 async getEngagements(): Promise<Engagement[]> {
  const client = this.getClient();
  
  // We point this to "service" because that is the name of our Sanity Schema
  const items = await client.fetch<any[]>(
    `*[_type == "service"] | order(order asc){
      id,
      name,
      subtitle,
      priceLine,
      description,
      bullets,
      highlight,
      order
    }`,
  );

  console.log('🔍 Raw Services from Sanity:', items); // Debugging log

  return (items ?? []).map((e) => ({
    id: e.id ?? '',
    name: e.name ?? '',
    subtitle: e.subtitle ?? '',
    priceLine: e.priceLine ?? '',
    description: e.description ?? '',
    bullets: e.bullets ?? [],
    highlight: !!e.highlight,
    order: e.order,
  }));
}

  async getProjects(): Promise<Project[]> {
    const client = this.getClient();

    // IMPORTANT: schemaTypes/project.ts uses name/outcome (not title/summary)
    const items = await client.fetch<ProjectDoc[]>(
      `*[_type == "project"]|order(order asc){
        name,
        outcome,
        tags,
        order
      }`,
    );

    return (items ?? []).map((p) => ({
      name: p.name ?? '',
      outcome: p.outcome ?? '',
      tags: p.tags ?? [],
    }));
  }

  async getFaq(): Promise<FaqItem[]> {
    const client = this.getClient();
    return client.fetch(
      `*[_type == "faq"]|order(order asc){
        question,
        answer
      }`,
    );
  }

  async getContactSettings(): Promise<ContactSettings | null> {
    const client = this.getClient();
    return client.fetch(
      `*[_type == "contactSettings"][0]{
        submitLabel,
        successMessage,
        nameLabel,
        namePlaceholder,
        emailLabel,
        emailPlaceholder,
        messageLabel,
        messagePlaceholder
      }`,
    );
  }
}
