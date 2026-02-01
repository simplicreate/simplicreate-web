import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SERVICES } from '../../data/services.data';
import { PROJECTS } from '../../data/projects.data';
import { SectionTitleComponent } from '../../shared/components/section-title.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, SectionTitleComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  services = SERVICES;
  projects = PROJECTS;
}
