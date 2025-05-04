import { Component } from '@angular/core';
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
  selector: 'app-certificates-earn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates-earn.component.html',
  styleUrl: './certificates-earn.component.scss',
})
export class CertificatesEarnComponent {
  certificates: Certificate[] = [
    {
      id: '3',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services Training and Certification',
      date: 'Issued 3/31/24',
      description: '',
      imageUrl:
        'https://images.credly.com/size/680x680/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    },
    {
      id: '4',
      title: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services Training and Certification',
      date: 'Issued 11/12/24',
      description: '',
      imageUrl:
        'https://images.credly.com/size/680x680/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
    },
    {
      id: '2',
      title: 'AWS Certified Data Analytics – Specialty',
      issuer: 'Amazon Web Services Training and Certification',
      date: 'Issued 7/18/21',
      description: '',
      imageUrl:
        'https://images.credly.com/size/680x680/images/6430efe4-0ac0-4df6-8f1b-9559d8fcdf27/image.png',
    },
    {
      id: '2',
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services Training and Certification',
      date: 'Issued 7/18/21',
      description: '',
      imageUrl:
        'https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
    },
  ];
}
