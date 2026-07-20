import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../shared/services/content.service';
import { Observable } from 'rxjs';
import { Tables } from '../../shared/enums/tables';

import { PdfViewerModule } from 'ng2-pdf-viewer';

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
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './certificates-earn.component.html',
  styleUrl: './certificates-earn.component.scss',
})
export class CertificatesEarnComponent implements OnInit {
  private contentService = inject(ContentService);
  // certificateList$: Observable<Certificate[]>;
  certificates: Certificate[] = [];
  filteredCertificates: Certificate[] = [];
  issuers: string[] = [];
  activeTab = 'ALL';
  loading = true;

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    this.loading = true;
    this.contentService.getContent(Tables.Certificate).subscribe({
      next: (data) => {
        this.certificates = data;
        this.filteredCertificates = [...this.certificates];
        this.extractIssuers();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching certificates:', error);
        this.loading = false;
      },
    });
  }
  extractIssuers(): void {
    const uniqueIssuers = new Set<string>();
    this.certificates.forEach((cert) => {
      if (cert.issuer) {
        uniqueIssuers.add(cert.issuer);
      }
    });
    this.issuers = Array.from(uniqueIssuers);
  }

  filterByIssuer(issuer: string): void {
    this.activeTab = issuer;

    if (issuer === 'ALL') {
      this.filteredCertificates = [...this.certificates];
    } else {
      this.filteredCertificates = this.certificates.filter(
        (cert) => cert.issuer === issuer
      );
    }
  }

  getYearFromDate(dateString: string): string {
    return new Date(dateString).getFullYear().toString();
  }

  // certificates: Certificate[] = [
  //   {
  //     id: '1',
  //     title: 'AWS Certified Cloud Practitioner',
  //     issuer: 'Amazon Web Services Training and Certification',
  //     date: 'Issued 3/31/24',
  //     description: '',
  //     imageUrl:
  //       '`https://images.credly.com/size/680x680/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png`',
  //   },
  //   {
  //     id: '2',
  //     title: 'AWS Certified Developer – Associate',
  //     issuer: 'Amazon Web Services Training and Certification',
  //     date: 'Issued 11/12/24',
  //     description: '',
  //     imageUrl:
  //       'https://images.credly.com/size/680x680/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
  //   },
  //   {
  //     id: '3',
  //     title: 'AWS Certified Data Analytics – Specialty',
  //     issuer: 'Amazon Web Services Training and Certification',
  //     date: 'Issued 7/18/21',
  //     description: '',
  //     imageUrl:
  //       'https://images.credly.com/size/680x680/images/6430efe4-0ac0-4df6-8f1b-9559d8fcdf27/image.png',
  //   },
  //   {
  //     id: '4',
  //     title: 'AWS Certified Solutions Architect – Associate',
  //     issuer: 'Amazon Web Services Training and Certification',
  //     date: 'Issued 7/18/21',
  //     description: '',
  //     imageUrl:
  //       'https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
  //   },
  // ];
}
