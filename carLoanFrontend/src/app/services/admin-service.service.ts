import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Loan } from '../loan';
import { UserAuthServiceService } from './user-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient, private userAuthService:UserAuthServiceService) { }

  token:any=this.userAuthService.getToken();
  newToken=this.token.replace(/['"]+/g, '')

  public editLoan(loan:Loan, loanId:number):Observable<any>{
    const id=String(loanId)
    return this.http.put<any>("http://localhost:8080/admin/editLoan/"+id, loan, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.newToken}`
      })
    })
    .pipe(catchError(this.errorHandler))
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error || 'Server Error');
  }
}
