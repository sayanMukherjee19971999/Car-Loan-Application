import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewLoanComponent } from './admin-view-loan.component';

describe('AdminViewLoanComponent', () => {
  let component: AdminViewLoanComponent;
  let fixture: ComponentFixture<AdminViewLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
