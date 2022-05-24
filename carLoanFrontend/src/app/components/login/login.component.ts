import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UserAuthServiceService } from 'src/app/services/user-auth-service.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  signup(){
    this.router.navigateByUrl("user/signup")
  }

  onSubmit(){
    this.getAccessToken(this.user);
  }

  adminPage(){
    this.router.navigateByUrl("admin/login")
  }

  public getAccessToken(user:any){
    let resp=this.loginService.generateToken(user);
    resp.subscribe(data=>{
      this.userAuthService.setToken(JSON.stringify(data));
      this.token= this.userAuthService.getToken();
      if(this.token!==null || this.token!==''){
        this.err=true
        this.status=200
        this.msg="We are redirecting you to the Loan Page"
          setTimeout(()=>{
            this.router.navigateByUrl('user/addLoan');
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
