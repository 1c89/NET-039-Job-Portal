import { TestBed } from '@angular/core/testing';

import { CheckDuplicateEmailService } from './check-duplicate-email.service';

describe('CheckDuplicateEmailService', () => {
  let service: CheckDuplicateEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckDuplicateEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
