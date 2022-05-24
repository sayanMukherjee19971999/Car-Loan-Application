import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminapprovedloanComponent } from './adminapprovedloan.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:'',
    component:AdminapprovedloanComponent
  }
]

@NgModule({
  declarations: [AdminapprovedloanComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    [RouterModule.forChild(routes)]
  ]
})
export class AdminapprovedloanModule { }
