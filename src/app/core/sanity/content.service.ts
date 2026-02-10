import { Injectable } from '@angular/core';
import { sanityClient, sanityEnabled } from './sanity.client';

import type { Project } from '../../data/projects.data';
import type { Service } from '../../data/services.data';

export interface SiteSettings {
  brandLabel?: string;
  heroHeadline?: string;
  heroSubheadline?: string;

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

interface ProjectDoc {
  title: string;
  outcome?: string;
  tags?: string[];
  order?: number;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private requireEnabled() {
    if (!sanityEnabled || !sanityClient) {
      // Keeps UI running even before projectId is configured
      throw new Error('Sanity not configured: set environment.sanity.projectId');
    }
  }

  async getSiteSettings(): Promise<SiteSettings | null> {
    this.requireEnabled();
    return sanityClient.fetch(
      `*[_type == "siteSettings"][0]{
        brandLabel,
        heroHeadline,
        heroSubheadline,
        ctaPrimaryText,
        ctaPrimaryHref,
        ctaSecondaryText,
        ctaSecondaryHref,
        ctaTertiaryText,
        ctaTertiaryHref,
        contactEmail
      }`
    );
  }

  async getServices(): Promise<Service[]> {
    this.requireEnabled();

    const items = await sanityClient.fetch<ServiceDoc[]>(
      `*[_type == "service"]|order(order asc){
        "id": coalesce(id, _id),
        title,
        description,
        bullets,
        icon,
        order
      }`
    );

    return (items ?? []).map(s => ({
      id: s.id,
      title: s.title ?? '',
      description: s.description ?? '',
      bullets: s.bullets ?? [],
      icon: s.icon,
    }));
  }

  async getProjects(): Promise<Project[]> {
    this.requireEnabled();

    const items = await sanityClient.fetch<ProjectDoc[]>(
      `*[_type == "project"]|order(order asc){
        title,
        "outcome": summary,
        tags,
        order
      }`
    );

    return (items ?? []).map(p => ({
      name: p.title ?? '',
      outcome: p.outcome ?? '',
      tags: p.tags ?? [],
    }));
  }

  async getFaq(): Promise<FaqItem[]> {
    this.requireEnabled();
    return sanityClient.fetch(
      `*[_type == "faq"]|order(order asc){
        question,
        answer
      }`
    );
  }

  async getContactSettings(): Promise<ContactSettings | null> {
    this.requireEnabled();
    return sanityClient.fetch(
      `*[_type == "contactSettings"][0]{
        submitLabel,
        successMessage,
        nameLabel,
        namePlaceholder,
        emailLabel,
        emailPlaceholder,
        messageLabel,
        messagePlaceholder
      }`
    );
  }
}