import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { EncryptDecryptService } from './encrypt-decrypt';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private aes: EncryptDecryptService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //debugger;
    if (request.url.match("api")){
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.aes.Decrypt(localStorage.getItem("Token"))}`
            }
          });
    }
    
    return next.handle(request);
  }
}