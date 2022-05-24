import { TestBed } from '@angular/core/testing';

import { ApplyLoanService } from './apply-loan.service';

describe('ApplyLoanService', () => {
  let service: ApplyLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
