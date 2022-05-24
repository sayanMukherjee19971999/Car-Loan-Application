import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackLoanService } from 'src/app/services/track-loan.service';
import { UserAuthServiceService } from 'src/app/services/user-auth-service.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-adminapprovedloan',
  templateUrl: './adminapprovedloan.component.html',
  styleUrls: ['./adminapprovedloan.component.css']
})
export class AdminapprovedloanComponent implements OnInit {

  msg:any={}
  err=false
  user=new User()
  id=0
  status:number=0
  loanId:string=''
  constructor(private router:Router,private userAuthService:UserAuthServiceService, private trackLoanService:TrackLoanService) { }

  ngOnInit(): void {
  }

  public logout(){
    this.userAuthService.clearLocalStorage();
    this.router.navigateByUrl("user/login");
  }
  viewLoan(){
    this.router.navigateByUrl("admin/appliedLoan");
  }

  trackLoan(){
    this.trackLoanService.trackLoan(this.loanId).subscribe(data=>{
      this.userAuthService.setLoanId(this.loanId)
      sessionStorage.setItem("userData",JSON.stringify(data))
      this.router.navigateByUrl("admin/viewLoan", {skipLocationChange:true});
    },
    error=>{
      this.err=true
      this.msg="No Loan Found With The Given Loan ID : "+this.loanId
      this.status=500
    }
    )
  }

}
