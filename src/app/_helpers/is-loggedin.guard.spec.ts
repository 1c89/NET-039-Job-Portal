import { TestBed } from '@angular/core/testing';

import { IsloggedInGuard } from './is-loggedin.guard';

describe('IsAuthenticatedGuard', () => {
  let guard: IsloggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsloggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
