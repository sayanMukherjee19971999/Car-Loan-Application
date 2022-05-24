import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/loan';
import { UserAuthServiceService } from 'src/app/services/user-auth-service.service';

@Component({
  selector: 'app-loan-id',
  templateUrl: './loan-id.component.html',
  styleUrls: ['./loan-id.component.css']
})
export class LoanIdComponent implements OnInit {

  loan=new Loan()
  constructor(private userAuthService:UserAuthServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  public logout(){
    this.userAuthService.clearLocalStorage();
    this.router.navigateByUrl("user/login");
  }

  public applyLoan(){
    this.router.navigateByUrl("user/addLoan")
  }

  loanStatus(){
    this.router.navigateByUrl("user/viewLoan")
  }

  profile(){
    this.router.navigateByUrl("user/getProfile")
  }

  loanId=this.userAuthService.getLoanId();

}
