import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../core/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(){
    //debugger;
    if (this.loginService.IsAuthenticated()){
        return true;
    } 
    else {
        this.router.navigate(['login']);
        return false;
    }
  }
}
