import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyJobPostingsComponent } from './company-job-postings.component';

describe('CompanyJobPostingsComponent', () => {
  let component: CompanyJobPostingsComponent;
  let fixture: ComponentFixture<CompanyJobPostingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyJobPostingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyJobPostingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
