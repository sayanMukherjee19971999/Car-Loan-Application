import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthServiceService } from 'src/app/services/user-auth-service.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-view-loan',
  templateUrl: './view-loan.component.html',
  styleUrls: ['./view-loan.component.css']
})
export class ViewLoanComponent implements OnInit {

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
  loanType:string=''
  button:string='pending'

  user=new User()
  id=0

  constructor(private router:Router, private userAuthService:UserAuthServiceService) { }

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
    this.loanType=this.getUserData.loanType

    if(this.loanType==='approve'){
      this.button='approve'
    }
    else if(this.loanType==='reject'){
      this.button='reject'
    }
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


}
