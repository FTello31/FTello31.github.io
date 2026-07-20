import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-links',
  imports: [CommonModule],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  socialLinks = [
    { url: 'https://github.com/FTello31', icon: 'github', label: 'GitHub' },
    {
      url: 'https://linkedin.com/in/fernandotello',
      icon: 'linkedin',
      label: 'LinkedIn',
    },
    // {
    //   url: 'https://twitter.com/yourusername',
    //   icon: 'twitter',
    //   label: 'Twitter',
    // },
    // {
    //   url: 'https://instagram.com/yourusername',
    //   icon: 'instagram',
    //   label: 'Instagram',
    // },
    // {
    //   url: 'https://codepen.io/yourusername',
    //   icon: 'codepen',
    //   label: 'CodePen',
    // },
  ];
}
