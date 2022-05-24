import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/loan';
import { ApplyLoanService } from 'src/app/services/apply-loan.service';
import { UserAuthServiceService } from 'src/app/services/user-auth-service.service';
import { User } from 'src/app/user';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css']
})
export class CustomerprofileComponent implements OnInit {

  getUserData:any={}
  applicantAadhar:string=''
  applicantAddress:string=''
  applicantEmail:string=''
  applicantMobile:string=''
  applicantName:string=''
  applicantPan:string=''
  applicantSalary:string=''
  loanAmountRequired:number=0
  loanRepaymentMonths:number=0
  monthlyEmi:number=0
  loanId:number=0
  showButton:boolean=true

  loan=new Loan()
  id=0
  user=new User()

  loanid:any=''
  fileName:any=''
  fileType:any=''

  constructor(private userAuthService:UserAuthServiceService, private router:Router, private loanService:ApplyLoanService) { }

  ngOnInit(): void {
    this.getUserData=JSON.parse(sessionStorage.getItem('userData') || '{}')

    this.applicantAadhar=this.getUserData.applicantAadhar
    this.applicantAddress=this.getUserData.applicantAddress
    this.applicantEmail=this.getUserData.applicantEmail
    this.applicantMobile=this.getUserData.applicantMobile
    this.applicantName=this.getUserData.applicantName
    this.applicantPan=this.getUserData.applicantPan
    this.applicantSalary=this.getUserData.applicantSalary
    this.loanAmountRequired=this.ConvertStringToNumber(this.getUserData.loanAmountRequired)
    this.loanId=this.getUserData.loanId
    this.monthlyEmi=this.getUserData.monthlyEmi

    this.loanid=sessionStorage.getItem("loanId")

    this.getFileName()

    this.getFileType()
  }

  ConvertStringToNumber(input:string){
    let numeric=Number(input)
    return numeric;
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

  getFileName(){
    this.loanService.downloadFileName(this.loanid).subscribe(fileName=>{
      sessionStorage.setItem("fileName",JSON.stringify(fileName))
    })
  }

  getFileType(){
    this.loanService.downloadFileType(this.loanid).subscribe(fileType=>{
      sessionStorage.setItem("fileType",JSON.stringify(fileType))
    })
  }

   downloadFile(){
    this.fileName=sessionStorage.getItem("fileName")
    this.fileType=sessionStorage.getItem("fileType")
    let fileExt=this.fileType.substr(this.fileType.indexOf('/')+1, 3)
    let file=fileExt.toUpperCase()
    this.loanService.downloadFile(this.loanid).subscribe(data=>{
      saveAs(new Blob([data], {type: file}), this.fileName)

    },error=>{
      console.log(error)
    })
  }

}
