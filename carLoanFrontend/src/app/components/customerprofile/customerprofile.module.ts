import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerprofileComponent } from './customerprofile.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:'',
    component:CustomerprofileComponent
  }
]

@NgModule({
  declarations: [CustomerprofileComponent],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerprofileModule { }
