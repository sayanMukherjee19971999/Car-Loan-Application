import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminappliedloanComponent } from './adminappliedloan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {
    path:'',
    component:AdminappliedloanComponent
  }
]

@NgModule({
  declarations: [AdminappliedloanComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    [RouterModule.forChild(routes)]
  ]
})
export class AdminappliedloanModule { }
