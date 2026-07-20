import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollspyService } from '../../shared/services/scrollspy.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navItems = [
    { link: '#about', label: 'About', id: 'about' },
    { link: '#experience', label: 'Experience', id: 'experience' },
    { link: '#projects', label: 'Projects', id: 'projects' },
  ];

  activeSection = 'about';

  constructor(private scrollspy: ScrollspyService) {
    this.scrollspy.activeSection$.subscribe((section) => {
      this.activeSection = section;
    });
  }
}
