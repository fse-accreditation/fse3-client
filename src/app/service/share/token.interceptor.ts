import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from '../user.service'
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userserviceService : UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userserviceService.isAuthenticate? this.userserviceService.token:''}`
      }
    });
    return next.handle(request);
  }
}
