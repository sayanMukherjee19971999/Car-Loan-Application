import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './components/login/login.module';
import { SignupModule } from './components/signup/signup.module';
import { CustomerapplyloanModule } from './components/customerapplyloan/customerapplyloan.module';
import { LoanIdModule } from './components/loan-id/loan-id.module';
import { ViewLoanModule } from './components/view-loan/view-loan.module';
import { TrackLoanModule } from './components/track-loan/track-loan.module';
import { AdminappliedloanModule } from './components/adminappliedloan/adminappliedloan.module';
import { AdminapprovedloanModule } from './components/adminapprovedloan/adminapprovedloan.module';
import { AdminViewLoanModule } from './components/admin-view-loan/admin-view-loan.module';
import { AdminLoginModule } from './components/admin-login/admin-login.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    SignupModule,
    CustomerapplyloanModule,
    LoanIdModule,
    ViewLoanModule,
    TrackLoanModule,
    AdminappliedloanModule,
    AdminapprovedloanModule,
    AdminViewLoanModule,
    AdminLoginModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
