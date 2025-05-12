import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../shared/services/content.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Tables } from '../../shared/enums/tables';

interface Experience {
  id: number;
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
  private contentService = inject(ContentService);
  experienceList$: Observable<Experience[]>;

  constructor() {
    this.experienceList$ = this.contentService.getContent(Tables.Experience);
  }

  // experiences: Experience[] = [
  //   {
  //     id: 1,
  //     date: 'May 2023 — Present',
  //     title: 'Frontend Developer',
  //     company: 'Newfire Global Partners',
  //     companyUrl: 'https://www.newfireglobal.com/',
  //     description:
  //       'Efficiently handled and completed assigned tickets and conducted unit tests to ensure code quality and functionality. Proactively proposed and implemented changes to enhance user experience and system performance. Achieved a consistently high customer satisfaction rate within the first 6 months of joining the project.',
  //     technologies: [
  //       'Angular',
  //       'JavaScript',
  //       'Go',
  //       'Karma',
  //       'Jasmine',
  //       'Git',
  //       'Scrum',
  //       'Figma',
  //     ],
  //   },
  //   {
  //     id: 2,
  //     date: 'Sep 2021 — Apr 2023',
  //     title: 'Frontend Developer',
  //     company: 'Globant',
  //     companyUrl: 'https://www.globant.com/',
  //     description:
  //       'Reduced initial app load time by redesigning, upgrading, optimizing, and restructuring the code. Diminished the number of bugs and code smells by adding different tools to help the development process. Reached above 80% coverage by implementing unit tests.',
  //     technologies: [
  //       'Angular',
  //       'JavaScript',
  //       'Karma',
  //       'Jasmine',
  //       'Git',
  //       'Scrum',
  //       'Figma',
  //     ],
  //   },
  //   {
  //     id: 3,
  //     date: 'Mar 2021 — Aug 2021',
  //     title: 'Tech Lead',
  //     company: 'Management Solutions',
  //     companyUrl: 'https://www.managementsolutions.com/en',
  //     description:
  //       "Delivered 100% of the proposed features of a cost distribution app, leading a team of 3 people, by being the bridge communication between client and project partner. Reduced an average of 2 hours the bulk upload process by migrating the client's existing desktop application to a better and more modern infrastructure.",
  //     technologies: [
  //       'Angular',
  //       'JavaScript',
  //       'Karma',
  //       'Jasmine',
  //       'Spring Boot',
  //       'SQL Server',
  //       'Git',
  //     ],
  //   },
  //   {
  //     id: 4,
  //     date: 'Mar 2019 — Mar 2021',
  //     title: 'Full Stack Developer',
  //     company: 'Management Solutions',
  //     companyUrl: 'https://www.managementsolutions.com/en',
  //     description:
  //       "Reduced the client's workload by 80% by designing, developing, testing and implementing an app that calculates the amount to be provisioned for a leading bank. Increased customer satisfaction by redesigning, optimizing, and migrating an application developed in an old framework to a SPA.",
  //     technologies: [
  //       'Angular',
  //       'JavaScript',
  //       'Karma',
  //       'Jasmine',
  //       'Java',
  //       'SQL Server',
  //       'Oracle',
  //       'Git',
  //     ],
  //   },
  // ];
}
