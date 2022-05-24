import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanIdComponent } from './loan-id.component';

describe('LoanIdComponent', () => {
  let component: LoanIdComponent;
  let fixture: ComponentFixture<LoanIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
