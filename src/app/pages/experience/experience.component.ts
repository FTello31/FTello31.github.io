import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  date: string;
  title: string;
  company: string;
  companyUrl: string;
  description: string;
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      date: '2024 — PRESENT',
      title: 'Senior Frontend Engineer, Accessibility',
      company: 'Klaviyo',
      companyUrl: '#',
      description:
        "Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
      technologies: ['JavaScript', 'TypeScript', 'React', 'Storybook'],
    },
    {
      date: '2018 — 2023',
      title: 'Lead Engineer',
      company: 'Upstatement',
      companyUrl: '#',
      description:
        'Built, ship, and ship high-quality websites, design systems, banks of components, and user experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th, and more.',
      technologies: ['JavaScript', 'TypeScript', 'HTML & CSS', 'React'],
    },
  ];
}
