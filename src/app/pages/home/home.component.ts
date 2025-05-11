import { AfterViewInit, Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectsComponent } from '../projects/projects.component';
import { BadgesComponent } from '../badges/badges.component';
import { ArticlesComponent } from '../articles/articles.component';
import { Observable } from 'rxjs';
import { FeatureFlagService } from '../../shared/services/feature-flag.service';
import { CommonModule } from '@angular/common';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScrollspyService } from '../../shared/services/scrollspy.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    BadgesComponent,
    ArticlesComponent,
    SocialLinksComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
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
