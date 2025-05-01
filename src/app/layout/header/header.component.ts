import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';

@Component({
  selector: 'app-header',
  // imports: [CommonModule],
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  //   navItems = [
  //     { name: 'About', link: '/about', number: '01.' },
  //     { name: 'Experience', link: '/experience', number: '02.' },
  //     { name: 'Projects', link: '/projects', number: '03.' },
  //     { name: 'Contact', link: '/contact', number: '04.' },
  //   ];

  //   isMenuOpen = signal(false);
  //   scrollState = signal('top');
  //   lastScrollTop = 0;
  //   isHeaderVisible = signal(true);

  //   toggleMenu(): void {
  //     this.isMenuOpen.update((value) => !value);
  //     // Prevent scrolling when menu is open
  //     document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
  //   }

  //   @HostListener('window:scroll', [])
  //   onWindowScroll() {
  //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  //     // Update background transparency based on scroll
  //     this.scrollState.set(scrollTop > 10 ? 'scrolled' : 'top');

  //     // Logic for hiding/showing header based on scroll direction
  //     if (scrollTop > this.lastScrollTop && scrollTop > 100) {
  //       this.isHeaderVisible.set(false); // Hide when scrolling down
  //     } else {
  //       this.isHeaderVisible.set(true); // Show when scrolling up
  //     }

  //     this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  //   }
  // }

  isScrolled = false;
  isMobileMenuOpen = false;

  navItems = [
    { link: '/about', label: 'About' },
    { link: '/experience', label: 'Experience' },
    { link: '/projects', label: 'Projects' },
    { link: '/contact', label: 'Contact' },
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
