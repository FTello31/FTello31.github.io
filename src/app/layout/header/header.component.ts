import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';
import { ScrollspyService } from '../../shared/scrollspy.service';

@Component({
  selector: 'app-header',
  // imports: [CommonModule],
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  navItems = [
    { link: '#about', label: 'About', id: 'about' },
    { link: '#experience', label: 'Experience', id: 'experience' },
    { link: '#projects', label: 'Projects', id: 'projects' },
    // Contact puede omitirse si no hay sección
  ];

  activeSection = 'about';

  constructor(private scrollspy: ScrollspyService) {
    this.scrollspy.activeSection$.subscribe((section) => {
      this.activeSection = section;
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
