import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAuthServiceService } from './user-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class TrackLoanService {

  constructor(private http: HttpClient, private userAuthService:UserAuthServiceService) { }

  token:any=this.userAuthService.getToken();
  newToken=this.token.replace(/['"]+/g, '')

  public trackLoan(loanId:string):Observable<any>{
    return this.http.get("http://localhost:8080/user/viewLoan", {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.newToken}`
      }),
      params: new HttpParams().set('loanId',loanId)
    })
    .pipe(catchError(this.errorHandler))
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error || 'Server Error');
  }
}
