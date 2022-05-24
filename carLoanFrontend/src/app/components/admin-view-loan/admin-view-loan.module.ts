import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewLoanComponent } from './admin-view-loan.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:'',
    component:AdminViewLoanComponent
  }
]

@NgModule({
  declarations: [AdminViewLoanComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminViewLoanModule { }
