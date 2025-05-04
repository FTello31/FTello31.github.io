import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesEarnComponent } from './certificates-earn.component';

describe('CertificatesEarnComponent', () => {
  let component: CertificatesEarnComponent;
  let fixture: ComponentFixture<CertificatesEarnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatesEarnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatesEarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
