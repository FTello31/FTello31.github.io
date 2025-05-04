import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
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
  featuredProjects: Project[] = [
    {
      title: 'Mira Que Lindo',
      description:
        'Web app for visualizing available products from a crafting company in real time.',
      image: 'https://miraquelindoperu.com/assets/images/logo-sin-fondo.png',
      link: 'https://miraquelindoperu.com',
      technologies: ['Angular', 'JavaScript', 'Firebase', 'Git'],
    },
    {
      title: 'CAII 2023 App',
      description:
        'iOS app developed to showcase the event schedule and biographies of the speakers. Available in Peru App Store.',
      image:
        'https://raw.githubusercontent.com/FTello31/Caii-2023/refs/heads/main/Caii-2023/Resources/Assets.xcassets/caii_icono_primary.imageset/Image.png',
      link: 'https://github.com/FTello31/Caii-2023',
      technologies: ['Swift', 'Git'],
    },
    {
      title: 'Tasty Marketplace App',
      description: 'Android Java app developed.',
      image:
        'https://raw.githubusercontent.com/FTello31/TastyVersion2/refs/heads/master/app/src/main/res/drawable-mdpi/cupcake.png',
      link: 'https://github.com/FTello31/TastyVersion2',
      technologies: ['Swift', 'Git'],
    },
  ];
}
