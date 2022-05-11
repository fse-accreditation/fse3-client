import { Injectable } from '@angular/core';
import {AuthToken} from '../entity/authToken';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {  ConfigService} from './share/config.service'
import { HttpClient } from '@angular/common/http';
import {UserDetail} from '../entity/user-detail'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  tokenUrl:string;
  authContext: UserDetail;

  constructor(private httpClient : HttpClient ,private configService : ConfigService) {
    this.tokenUrl='/api/v1/users/authenticate';
   }

  isUserAuthenticate(userDetail:UserDetail): Observable<AuthToken>{
    this.authContext={...userDetail};
    const url =this.configService.getServerUrl(this.tokenUrl);
    return this.httpClient.post<AuthToken>(url, this.authContext)
    .pipe(
      map((response : any)=>{
       return new AuthToken(response?.result?.token,response?.result?.userName,response?.result?.userType);
        
        
      }),
      catchError(this.handleError('getToken', new AuthToken('','','')))
    );
  }      



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return throwError(error);
    };
  }
  
  private log(message: string) {
    console.log(message);
  }
}


