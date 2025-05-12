import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollspyService } from '../../shared/services/scrollspy.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  isScrolled = false;
  isMobileMenuOpen = false;

  navItems = [
    { link: '#about', label: 'About', id: 'about' },
    { link: '#experience', label: 'Experience', id: 'experience' },
    { link: '#projects', label: 'Projects', id: 'projects' },
    // Contact puede omitirse si no hay sección
  ];

  activeSection = 'about';

  constructor(private scrollspy: ScrollspyService) {}

  ngAfterViewInit(): void {
    this.scrollspy.activeSection$.subscribe((section) => {
      this.activeSection = section;
    });
    throw new Error('Method not implemented.');
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
