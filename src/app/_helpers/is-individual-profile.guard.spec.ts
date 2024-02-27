import { TestBed } from '@angular/core/testing';

import { IsIndividualProfileGuard } from './is-individual-profile.guard';

describe('IsInvividualProfileGuard', () => {
  let guard: IsIndividualProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsIndividualProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
