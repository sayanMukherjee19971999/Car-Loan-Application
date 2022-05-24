import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackLoanService } from 'src/app/services/track-loan.service';
import { UserAuthServiceService } from 'src/app/services/user-auth-service.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-track-loan',
  templateUrl: './track-loan.component.html',
  styleUrls: ['./track-loan.component.css']
})
export class TrackLoanComponent implements OnInit {

  loanId:string=''
  msg:any={}
  err=false
  user=new User()
  id=0
  status:number=0

  constructor(private userAuthService:UserAuthServiceService, private router:Router, private trackLoanService:TrackLoanService) { }

  ngOnInit(): void {
  }

  public logout(){
    this.userAuthService.clearLocalStorage();
    this.router.navigateByUrl("user/login");
  }

  addLoan(){
    this.router.navigateByUrl("user/addLoan");
  }

  loanStatus(){
    this.router.navigateByUrl("user/viewLoan");
  }

  profile(){
    this.router.navigateByUrl("user/getProfile")
  }

  trackLoan(){
    this.trackLoanService.trackLoan(this.loanId).subscribe(data=>{
      this.userAuthService.setLoanId(this.loanId)
      sessionStorage.setItem("userData",JSON.stringify(data))
      this.router.navigateByUrl("user/viewLoan/status", {skipLocationChange:true});
    },
    error=>{
      this.err=true
      this.msg="No Loan Found With The Given Loan ID : "+this.loanId
      this.status=500
    }
    )
  }

}
