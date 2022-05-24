import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerapplyloanComponent } from './customerapplyloan.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:'',
    component:CustomerapplyloanComponent
  }
]

@NgModule({
  declarations: [CustomerapplyloanComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    [RouterModule.forChild(routes)]
  ]
})
export class CustomerapplyloanModule { }
