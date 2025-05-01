import { Component } from '@angular/core';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';

interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  range: string;
  description: string;
  skills: string[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  coverImage?: string;
  externalLink?: string;
  githubLink?: string;
  tech: string[];
  featured: boolean;
  stats?: string;
}

@Component({
  selector: 'app-home',
  // imports: [SocialLinksComponent],
  imports: [CommonModule, RouterModule, SocialLinksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  name = 'Your Name';
  title = 'Front End Engineer';
  description =
    'I build accessible, pixel-perfect digital experiences for the web.';

  experiences: Experience[] = [
    {
      title: 'Senior Frontend Engineer, Accessibility',
      company: 'Kinvey',
      companyUrl: 'https://example.com',
      range: 'PRESENT',
      description:
        'Built and designed accessible solutions to enhance UI/UX across functional teams, including developers, designers, and product managers. To incentivize and advocate for best practices in web accessibility.',
      skills: ['JavaScript', 'TypeScript', 'React', 'Storybook'],
    },
    {
      title: 'Lead Engineer',
      company: 'Upstatement',
      companyUrl: 'https://example.com',
      range: '2018 — 2023',
      description:
        'Built, ship, and ship high-quality websites, design systems, books and other digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Work closely with designers, strategists, and copywriters through close collaboration, knowledge shares, and spearheading the development of internal tools.',
      skills: [
        'JavaScript',
        'TypeScript',
        'HTML & CSS',
        'React',
        'Next.js',
        'React Native',
        'WordPress',
        'Drupal',
        'Figma',
        'PHP',
      ],
    },
    {
      title: 'UI Engineer Co-op',
      company: 'Apple',
      companyUrl: 'https://example.com',
      range: 'JULY — DEC 2017',
      description:
        "Developed and styled interactive web apps for Apple Music, including the UI/UX of Apple Music's embeddable web player widgets for in-browser user authentication and music playback.",
      skills: ['Ember', 'SCSS', 'JavaScript', 'MusicKit.js'],
    },
  ];

  featuredProjects: Project[] = [
    {
      id: 1,
      title: 'Build a Spotify Connected App',
      description:
        'Web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and create playlists with recommended tracks based on your existing playlists and more.',
      coverImage: '/assets/images/spotify-app.jpg',
      externalLink: 'https://example.com',
      githubLink: 'https://github.com',
      tech: ['React', 'Express', 'Spotify API', 'Heroku'],
      featured: true,
      stats: '8,170',
    },
    {
      id: 2,
      title: 'Halcyon Theme',
      description:
        'Minimal dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more.',
      coverImage: '/assets/images/halcyon-theme.jpg',
      externalLink: 'https://example.com',
      githubLink: 'https://github.com',
      tech: ['VS Code', 'Sublime Text', 'Atom', 'iTerm2', 'Hyper'],
      featured: true,
      stats: '1,000+ Installs',
    },
    {
      id: 3,
      title: 'brittanychiang.com (v4)',
      description:
        'An old portfolio site built with Gatsby with 8k+ stars and 3k+ forks',
      coverImage: '/assets/images/portfolio-v4.jpg',
      externalLink: 'https://example.com',
      githubLink: 'https://github.com',
      tech: ['Gatsby', 'Styled Components', 'Netlify'],
      featured: true,
      stats: '7,350',
    },
  ];

  articles: Project[] = [
    {
      id: 4,
      title: '3 Common Accessibility Pitfalls and How to Avoid Them',
      description: 'Tips for creating more accessible web applications',
      externalLink: 'https://example.com',
      tech: ['2024', 'Accessibility', 'Web'],
      featured: false,
    },
    {
      id: 5,
      title: 'Integrating Algolia Search with WordPress Multisite',
      description: 'Adding powerful search capabilities to WordPress sites',
      externalLink: 'https://example.com',
      tech: ['2022', 'WordPress', 'Algolia'],
      featured: false,
    },
    {
      id: 6,
      title: 'Building a Headless Mobile App CMS From Scratch',
      description:
        'Creating a flexible content management system for mobile apps',
      externalLink: 'https://example.com',
      tech: ['2019', 'React Native', 'Node.js', 'CMS'],
      featured: false,
    },
  ];
}
