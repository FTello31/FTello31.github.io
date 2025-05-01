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
      title: 'Spotify Profile',
      description:
        'Web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.',
      image: 'images/a.png',
      link: '#',
      stats: '678',
      technologies: ['React', 'Express', 'Spotify API', 'Heroku'],
    },
    {
      title: 'Halcyon Theme',
      description:
        'Minimal dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more.',
      image: 'images/a.png',
      link: '#',
      stats: '100k+ Installs',
      technologies: ['VS Code', 'Sublime Text', 'Atom', 'iTerm2', 'Hyper'],
    },
    {
      title: 'brittanychiang.com (v4)',
      description:
        'An old portfolio site built with Gatsby with 6k+ stars and 3k+ forks',
      image: 'images/a.png',
      link: '#',
      stats: '7,861',
      technologies: ['Gatsby', 'Styled Components', 'Netlify'],
    },
  ];
}
