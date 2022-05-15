import { Injectable } from '@angular/core';
import {  ConfigService} from './share/config.service'
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {ProductDetail} from '../entity/product-detail'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private getAllProductBySellerUrl:string;
  constructor(private httpClient : HttpClient ,private configService : ConfigService) { 
    this.getAllProductBySellerUrl='/e-auction/api/v1/Product';
  }


  getAllProductBySeller(sellerEmail:string): Observable<ProductDetail[]>{
    let params = new HttpParams();
    params = params.append('sellerEmail', sellerEmail);
    const url =this.configService.getServerUrl(this.getAllProductBySellerUrl);
    return this.httpClient.get<ProductDetail[]>(`${url}/${sellerEmail}`)
    .pipe(
     // map(response=>response.map( res => {return new ProductDetail(response.productId,response.productName,response.description,response.startingPrice,response.bidEndDate,response.UserDetail.email,response.category)} )),
      catchError(this.handleError<ProductDetail[]>('', 
      []))
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
