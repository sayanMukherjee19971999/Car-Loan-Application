import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanIdComponent } from './loan-id.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {
    path:'',
    component:LoanIdComponent
  }
]

@NgModule({
  declarations: [LoanIdComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ]
})
export class LoanIdModule { }
