import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private _token:string;
private _userName:string;
private _isAuthenticate:boolean=false;
  constructor() { }

  public get isAuthenticate() {
    const sessionObj = localStorage.getItem('userdetails') ?? '';
    if (sessionObj !== '') {
      const details = JSON.parse(sessionObj);
      this._token = details?.token;
      this._isAuthenticate = true;
      this._userName=details?.userName;
    }

    return this._isAuthenticate;
  }

  public get token() {
      return this._token;
  }

  public get userName() {
    return this._userName;
}

  SignOut():void{
    localStorage.clear();
  }

}
