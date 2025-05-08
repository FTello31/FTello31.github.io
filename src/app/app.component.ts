import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SocialLinksComponent } from './shared/social-links/social-links.component';
import { AboutComponent } from './pages/about/about.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ScrollspyService } from './shared/services/scrollspy.service';
import { CertificatesEarnComponent } from './pages/certificates-earn/certificates-earn.component';
import { Observable } from 'rxjs';
import { FeatureFlagService } from './shared/services/feature-flag.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SocialLinksComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    ArticlesComponent,
    CertificatesEarnComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'fernando-tello';
  isArticlesActivated$: Observable<boolean>;

  constructor(
    private scrollspy: ScrollspyService,
    private featureFlagService: FeatureFlagService
  ) {
    this.isArticlesActivated$ = this.featureFlagService.getValue(
      'isArticlesActivated',
      false
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const sectionIds = ['about', 'experience', 'projects'];
    const options = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.scrollspy.setActiveSection(entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
}
