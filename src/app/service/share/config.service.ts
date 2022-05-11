import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl : string;

  constructor() {
    this.apiUrl='http://localhost:50000';
   // this.apiUrl='https://product-bid.free.beeceptor.com';
   }

   getServerUrl(url: string) : string{
     return this.apiUrl+url;
   }
}
