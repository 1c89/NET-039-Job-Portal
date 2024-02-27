import { TestBed } from '@angular/core/testing';

import { IsCompanyProfileGuard } from './is-company-profile.guard';

describe('IsCompanyProfileGuard', () => {
  let guard: IsCompanyProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsCompanyProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
