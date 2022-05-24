import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {

  constructor() { }

  public setToken(token: string){
    sessionStorage.setItem("jwtToken", token);
  }

  public getToken(){
    return sessionStorage.getItem("jwtToken");
  }

  public clearLocalStorage(){
    sessionStorage.clear();
  }

  public isLoggedIn(){
    return this.getToken();
  }

  public setLoanId(loanId: string){
    sessionStorage.setItem("loanId",loanId)
  }

  public getLoanId(){
    return sessionStorage.getItem("loanId");
  }
}
