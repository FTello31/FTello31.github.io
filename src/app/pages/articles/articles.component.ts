import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Article {
  year: number;
  title: string;
  imageUrl: string;
  link: string;
}

@Component({
  selector: 'app-articles',
  imports: [CommonModule, RouterLink],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent {
  articles: Article[] = [
    {
      year: 2024,
      title: '5 Common Accessibility Pitfalls and How to Avoid Them',
      imageUrl: '/images/a.png',
      link: '/articles/accessibility-pitfalls',
    },
    {
      year: 2020,
      title: 'Integrating Algolia Search with WordPress Multisite',
      imageUrl: '/images/a.png',
      link: '/articles/algolia-wordpress',
    },
    {
      year: 2019,
      title: 'Building a Headless Mobile App CMS From Scratch',
      imageUrl: '/images/a.png',
      link: '/articles/headless-cms',
    },
  ];
}
