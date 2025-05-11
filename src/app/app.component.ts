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
import { BadgesComponent } from './pages/badges/badges.component';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
}
