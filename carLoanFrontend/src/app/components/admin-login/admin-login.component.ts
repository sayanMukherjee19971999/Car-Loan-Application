import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UserAuthServiceService } from 'src/app/services/user-auth-service.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  user=new User()
  msg:any={}
  err=false
  status:number=0
  token:any=''
  
  constructor(private router:Router, private loginService:LoginServiceService, private userAuthService:UserAuthServiceService) { }

  ngOnInit(): void {
  }

  exform=new FormGroup({
    'email':new FormControl('',[Validators.required, Validators.email]),
    'password':new FormControl('',[Validators.required, Validators.maxLength(20), Validators.minLength(8)])
  })

  get email(){
    return this.exform.get('email')
  }

  get password(){
    return this.exform.get('password')
  }

  onSubmit(){
    this.getAccessToken(this.user);
  }

  public getAccessToken(user:any){
    let resp=this.loginService.generateTokenAdmin(user);
    resp.subscribe(data=>{
      this.userAuthService.setToken(JSON.stringify(data));
      this.token= this.userAuthService.getToken();
      if(this.token!==null || this.token!==''){
        this.err=true
        this.status=200
        this.msg="We are redirecting you to the Admin Dashboard"
          setTimeout(()=>{
            this.router.navigateByUrl('admin/appliedLoan');
        }, 2000);
      }
    },
    error=>{
      console.log(error)
      this.err=true
      if(error.status===500){
        this.status=500
        this.msg="Invalid username or password!! Try again..."
      }
    }
    );
  }

}
