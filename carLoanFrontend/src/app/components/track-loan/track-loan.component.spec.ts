import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackLoanComponent } from './track-loan.component';

describe('TrackLoanComponent', () => {
  let component: TrackLoanComponent;
  let fixture: ComponentFixture<TrackLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
