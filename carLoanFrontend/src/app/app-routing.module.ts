import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'user/login',
    pathMatch:'full'
  },
  {
    path:'user/login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path:'user/signup',
    loadChildren: () => import('./components/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path:'user/addLoan',
    loadChildren:()=>import('./components/customerapplyloan/customerapplyloan.module').then(m=>m.CustomerapplyloanModule),
    canActivate:[AuthGuardGuard]
  },
  {
    path:'user/loanApplied',
    loadChildren:()=>import('./components/loan-id/loan-id.module').then(m=>m.LoanIdModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'user/viewLoan',
    loadChildren:()=>import('./components/track-loan/track-loan.module').then(m=>m.TrackLoanModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'user/viewLoan/status',
    loadChildren:()=>import('./components/view-loan/view-loan.module').then(m=>m.ViewLoanModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'user/getProfile',
    loadChildren: ()=>import('./components/customerprofile/customerprofile.module').then(m=>m.CustomerprofileModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'admin/login',
    loadChildren: ()=>import('./components/admin-login/admin-login.module').then(m=>m.AdminLoginModule)
  },
  {
    path: 'admin/appliedLoan',
    loadChildren: ()=>import('./components/adminappliedloan/adminappliedloan.module').then(m=>m.AdminappliedloanModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'admin/trackLoan',
    loadChildren: ()=>import('./components/adminapprovedloan/adminapprovedloan.module').then(m=>m.AdminapprovedloanModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'admin/viewLoan',
    loadChildren: ()=>import('./components/admin-view-loan/admin-view-loan.module').then(m=>m.AdminViewLoanModule),
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
