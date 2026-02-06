import {Injectable} from '@angular/core'
import {sanityClient} from './sanity.client'

export interface ServiceDto {
  title: string
  bullets: string[]
  order?: number
}

export interface ProjectDto {
  title: string
  summary?: string
  url?: string
  order?: number
}

export interface SiteSettingsDto {
  heroHeadline?: string
  heroSubheadline?: string
  heroCtaText?: string
  heroCtaHref?: string
  contactEmail?: string
}

@Injectable({providedIn: 'root'})
export class ContentService {
  getSiteSettings(): Promise<SiteSettingsDto | null> {
    return sanityClient.fetch(
      `*[_type=="siteSettings"][0]{heroHeadline,heroSubheadline,heroCtaText,heroCtaHref,contactEmail}`
    )
  }

  getServices(): Promise<ServiceDto[]> {
    return sanityClient.fetch(
      `*[_type=="service"]|order(order asc){title,bullets,order}`
    )
  }

  getProjects(): Promise<ProjectDto[]> {
    return sanityClient.fetch(
      `*[_type=="project"]|order(order asc){title,summary,url,order}`
    )
  }
}