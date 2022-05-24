import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user=new User()
  err=false
  msg:any={}

  constructor(private router:Router, private loginService:LoginServiceService) { }

  ngOnInit(): void {
  }

  exform=new FormGroup({
    'email':new FormControl('',[Validators.required, Validators.email]),
    'username':new FormControl('',[Validators.required, Validators.pattern("^[A-Za-z]+$")]),
    'mobileNumber': new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[6-9][0-9]+$")]),
    'password':new FormControl('',[Validators.required, Validators.maxLength(20), Validators.minLength(8)])
  })

  get email(){
    return this.exform.get('email')
  }

  get password(){
    return this.exform.get('password')
  }

  get username(){
    return this.exform.get('username')
  }

  get mobileNumber(){
    return this.exform.get('mobileNumber')
  }

  login(){
    this.router.navigateByUrl("register")
  }

  onSubmit(){
    this.loginService.registerUserFormRemoteServer(this.user).subscribe(
      data=>{
        this.router.navigateByUrl("user/login");
      },
      error=>{
        this.err=true
        this.msg=error.error
      }
    )
  }
}
