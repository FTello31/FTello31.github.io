import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SocialLinksComponent } from './shared/social-links/social-links.component';
import { AboutComponent } from './pages/about/about.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ArticlesComponent } from './pages/articles/articles.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SocialLinksComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    ArticlesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fernando-tello';

  ngOnInit() {
    // Aquí puedes inicializar las animaciones de scroll cuando implementes ngx-scrollreveal
  }
}
