import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tables } from '../../shared/enums/tables';
import { ContentService } from '../../shared/services/content.service';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string;
  stats?: string;
  technologies: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private contentService = inject(ContentService);
  projectList$: Observable<Project[]>;

  constructor() {
    this.projectList$ = this.contentService.getContent(Tables.Project);
  }

  // featuredProjects: Project[] = [
  //   {
  //     id: 1,
  //     title: 'Mira Que Lindo',
  //     description:
  //       'Web app for visualizing available products from a crafting company in real time.',
  //     image: 'https://miraquelindoperu.com/assets/images/logo-sin-fondo.png',
  //     link: 'https://miraquelindoperu.com',
  //     technologies: ['Angular', 'JavaScript', 'Firebase', 'Git'],
  //   },
  //   {
  //     id: 2,
  //     title: 'CAII 2023 App',
  //     description:
  //       'iOS app developed to showcase the event schedule and biographies of the speakers. Available in Peru App Store.',
  //     image:
  //       'https://raw.githubusercontent.com/FTello31/Caii-2023/refs/heads/main/Caii-2023/Resources/Assets.xcassets/caii_icono_primary.imageset/Image.png',
  //     link: 'https://github.com/FTello31/Caii-2023',
  //     technologies: ['Swift', 'Git'],
  //   },
  //   {
  //     id: 3,
  //     title: 'Tasty Marketplace App',
  //     description: 'Android Java app.',
  //     image:
  //       'https://raw.githubusercontent.com/FTello31/TastyVersion2/refs/heads/master/app/src/main/res/drawable-mdpi/cupcake.png',
  //     link: 'https://github.com/FTello31/TastyVersion2',
  //     technologies: ['Android', 'Git'],
  //   },
  // ];
}
