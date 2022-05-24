import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserAuthServiceService } from 'src/app/services/user-auth-service.service';
import {Loan} from 'src/app/loan';
import { ApplyLoanService } from 'src/app/services/apply-loan.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-adminappliedloan',
  templateUrl: './adminappliedloan.component.html',
  styleUrls: ['./adminappliedloan.component.css']
})
export class AdminappliedloanComponent implements OnInit {

  loan=new Loan()
  getAllLoans:any=[]
  loanid:any=''
  fileName:any=''
  fileType:any=''

  constructor(private router:Router, private userAuthService:UserAuthServiceService, private adminService:AdminService, private loanService:ApplyLoanService) { }

  ngOnInit(): void {
    this.adminService.getAllLoan().subscribe(data=>{
      this.getAllLoans=data;
    },
    error=>console.log(error)
    )

    this.loanid=sessionStorage.getItem("loanId")


  }
  
  public logout(){
    this.userAuthService.clearLocalStorage();
    this.router.navigateByUrl("user/login");
  }
  viewLoan(){
    this.router.navigateByUrl("admin/viewLoan");
  }
  trackLoan(){
    this.router.navigateByUrl("admin/trackLoan");
  }
  approveLoan(){
    this.router.navigateByUrl("admin/viewLoan");
  }

  rejectLoan(){
    this.router.navigateByUrl("admin/viewLoan");
  }

  downloadFile(loanId:number){
    sessionStorage.setItem("loanId",JSON.stringify(loanId))
    this.loanid=sessionStorage.getItem("loanId")
    this.loanService.downloadFileName(this.loanid).subscribe(fileName=>{
      sessionStorage.setItem("fileName",JSON.stringify(fileName))
    })
    this.loanService.downloadFileType(this.loanid).subscribe(fileType=>{
      sessionStorage.setItem("fileType",JSON.stringify(fileType))
    })
    
    setTimeout(()=>{
      this.fileName=sessionStorage.getItem("fileName")
      this.fileType=sessionStorage.getItem("fileType")
      
      this.loanService.downloadFile(this.loanid).subscribe(data=>{
        saveAs(new Blob([data], {type: this.fileType}), this.fileName)

      },error=>{
        console.log(error)
      })
    },1000)
    
  }

  

}

