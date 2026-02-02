import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SERVICES } from '../../data/services.data';
import { PROJECTS } from '../../data/projects.data';
import { PACKAGES } from '../../data/packages.data';
import { SectionTitleComponent } from '../../shared/components/section-title.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, SectionTitleComponent],
  templateUrl: './home.component.html',
})
/**
 * Home page component that displays services, projects, and packages.
 */
export class HomeComponent {
  /** List of services to display */
  services = SERVICES;
  /** List of projects to display */
  projects = PROJECTS;
  /** List of packages to display */
  packages = PACKAGES;
}