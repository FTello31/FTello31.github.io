import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SocialLinksComponent } from './shared/social-links/social-links.component';
import { AboutComponent } from './pages/about/about.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ScrollspyService } from './shared/scrollspy.service';
import { CertificatesEarnComponent } from './shared/certificates-earn/certificates-earn.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    SocialLinksComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    // ArticlesComponent,
    CertificatesEarnComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'fernando-tello';

  constructor(private scrollspy: ScrollspyService) {}

  ngOnInit() {
    // Aquí puedes inicializar las animaciones de scroll cuando implementes ngx-scrollreveal
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
