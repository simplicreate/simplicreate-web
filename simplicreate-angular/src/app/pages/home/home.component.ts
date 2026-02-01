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
export class HomeComponent {
  services = SERVICES;
  projects = PROJECTS;
  packages = PACKAGES;
}