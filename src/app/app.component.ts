import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { FeatureFlagService } from './shared/services/feature-flag.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Fernando Tello';
  isArticlesActivated$: Observable<boolean>;

  constructor(private featureFlagService: FeatureFlagService) {
    this.isArticlesActivated$ = this.featureFlagService.getValue(
      'isArticlesActivated',
      false
    );
  }

  ngOnInit() {}
}
