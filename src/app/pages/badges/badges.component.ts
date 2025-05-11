import { Component, inject } from '@angular/core';
import { ContentService } from '../../shared/services/content.service';
import { Observable } from 'rxjs';
import { Tables } from '../../shared/enums/tables';
import { CommonModule } from '@angular/common';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-badges',
  imports: [CommonModule],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.scss',
})
export class BadgesComponent {
  private contentService = inject(ContentService);
  badgeList$: Observable<Certificate[]>;

  constructor() {
    this.badgeList$ = this.contentService.getContent(Tables.Badge);
  }

  badges: Certificate[] = [
    {
      id: '1',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services Training and Certification',
      date: 'Issued 3/31/24',
      description: '',
      imageUrl:
        '`https://images.credly.com/size/680x680/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png`',
    },
    {
      id: '2',
      title: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services Training and Certification',
      date: 'Issued 11/12/24',
      description: '',
      imageUrl:
        'https://images.credly.com/size/680x680/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
    },
    {
      id: '3',
      title: 'AWS Certified Data Analytics – Specialty',
      issuer: 'Amazon Web Services Training and Certification',
      date: 'Issued 7/18/21',
      description: '',
      imageUrl:
        'https://images.credly.com/size/680x680/images/6430efe4-0ac0-4df6-8f1b-9559d8fcdf27/image.png',
    },
    {
      id: '4',
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services Training and Certification',
      date: 'Issued 7/18/21',
      description: '',
      imageUrl:
        'https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
    },
  ];
}
