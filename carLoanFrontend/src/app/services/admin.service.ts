import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAuthServiceService } from './user-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private userAuthService:UserAuthServiceService) { }

  token:any=this.userAuthService.getToken();
  newToken=this.token.replace(/['"]+/g, '')

  public getAllLoan():Observable<any>{
    return this.http.get<any>("http://localhost:8080/admin/getAllLoans",{
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
