import { TestBed } from '@angular/core/testing';

import { TrackLoanService } from './track-loan.service';

describe('TrackLoanService', () => {
  let service: TrackLoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackLoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
