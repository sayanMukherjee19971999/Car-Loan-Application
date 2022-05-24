import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLoanComponent } from './view-loan.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {
    path:'',
    component:ViewLoanComponent
  }
]

@NgModule({
  declarations: [ViewLoanComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ]
})
export class ViewLoanModule { }
