import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { UserAuthServiceService } from 'src/app/services/user-auth-service.service';

@Component({
  selector: 'app-admin-view-loan',
  templateUrl: './admin-view-loan.component.html',
  styleUrls: ['./admin-view-loan.component.css']
})
export class AdminViewLoanComponent implements OnInit {

  getUserData:any={}
  applicantAadhar:string=''
  applicantAddress:string=''
  applicantEmail:string=''
  applicantMobile:string=''
  applicantName:string=''
  applicantPan:string=''
  applicantSalary:string=''
  loanAmountRequired:string=''
  loanId:number=0
  loanRepaymentMonths:string=''
  approved:boolean=false
  rejected:boolean=false

  constructor(private router:Router, private userAuthService:UserAuthServiceService, private adminService:AdminServiceService) { }

  ngOnInit(): void {
    this.getUserData=JSON.parse(sessionStorage.getItem('userData') || '{}')

    this.applicantAadhar=this.getUserData.applicantAadhar
    this.applicantAddress=this.getUserData.applicantAddress
    this.applicantEmail=this.getUserData.applicantEmail
    this.applicantMobile=this.getUserData.applicantMobile
    this.applicantName=this.getUserData.applicantName
    this.applicantPan=this.getUserData.applicantPan
    this.applicantSalary=this.getUserData.applicantSalary
    this.loanAmountRequired=this.getUserData.loanAmountRequired
    this.loanId=this.getUserData.loanId
  }

  public logout(){
    this.userAuthService.clearLocalStorage();
    this.router.navigateByUrl("user/login");
  }
  viewLoan(){
    this.router.navigateByUrl("admin/appliedLoan");
  }

  trackLoan(){
    this.router.navigateByUrl("admin/trackLoan");
  }

  approveLoan(){
    this.getUserData.loanType="Approve"
    this.adminService.editLoan(this.getUserData, this.loanId).subscribe(data=>{

    },
    error=>{
      this.approved=true
      this.rejected=false
    }
    )
  }

  rejectLoan(){
    this.getUserData.loanType="Reject"
    this.adminService.editLoan(this.getUserData, this.loanId).subscribe(data=>{

    },
    error=>{
      this.rejected=true
      this.approved=false
    }
    )
  }

}
