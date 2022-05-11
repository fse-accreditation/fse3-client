import { Injectable } from '@angular/core';
import {  ConfigService} from './share/config.service'
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {CompanyDetail} from '../entity/company-detail'
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  getallUrl:string;
  getByCompCodeUrl:string;
  companyContext: any;
  constructor(private httpClient : HttpClient ,private configService : ConfigService) {
    this.getallUrl='api/v1.0/market/company/getall';
    this.getByCompCodeUrl='api/v1.0/market/company/info';
   }

  getAllCompany(): Observable<CompanyDetail[]>{
    const url =this.configService.getServerUrl(this.getallUrl);
    return this.httpClient.get<CompanyDetail[]>(url)
    .pipe(
      catchError(this.handleError<CompanyDetail[]>('getAllCompany', []))
    );
 }      
 
 getCompanyDetailsByCode(companyCode:string): Observable<CompanyDetail>{
  let params = new HttpParams();
  params = params.append('companycode', companyCode);
  const url =this.configService.getServerUrl(this.getByCompCodeUrl);
  return this.httpClient.get<CompanyDetail>(`${url}/${companyCode}`)
  .pipe(
    catchError(this.handleError<CompanyDetail>('getCompanyByID', new CompanyDetail()))
  );
}

 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    this.log(error);
    this.log(`${operation} failed: ${error.message}`);
    return throwError(error);
  };
}

private log(message: string) {
  console.log(message);
}

}
