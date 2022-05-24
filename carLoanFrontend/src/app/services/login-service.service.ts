import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }

  public generateToken(user:User){
    return this.http.post("http://localhost:8080/user/login",user,{responseType: 'text' as 'json'})
  }

  public generateTokenAdmin(user:User){
    return this.http.post("http://localhost:8080/admin/login",user,{responseType: 'text' as 'json'})
  }

  public registerUserFormRemoteServer(user:User):Observable<any>{
    return this.http.post<any>("http://localhost:8080/user/signup",user)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error || 'Server Error');
  }
}
