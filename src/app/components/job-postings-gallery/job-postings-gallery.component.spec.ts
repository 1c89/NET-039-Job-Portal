import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingsGalleryComponent } from './job-postings-gallery.component';

describe('JobPostingsGalleryComponent', () => {
  let component: JobPostingsGalleryComponent;
  let fixture: ComponentFixture<JobPostingsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPostingsGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostingsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
