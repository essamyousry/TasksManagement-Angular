import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map, catchError, max } from 'rxjs/operators';
import { EncryptDecryptService } from './encrypt-decrypt';

@Injectable()
export class LoginService {

    //Authenticated = localStorage.getItem("Token") == "null" ? false : true;
    Authenticated;
    baseURL = 'https://localhost:44333/';
    private Token: string;

    constructor(private http: HttpClient, private aes: EncryptDecryptService){
    }

    getToken(username, password){
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        let body = new URLSearchParams();
        body.set('Username', username);
        body.set('Password', password);
        body.set('grant_type', 'password');

        return this.http.post(this.baseURL + 'Token', body.toString(), {headers})
            .pipe(
                catchError(this.handleError)
            )
    }
    
    handleError(error: any){
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            // return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }

    IsAuthenticated(){
        //debugger;
        let token = this.aes.Decrypt(localStorage.getItem("Token"));
        if (token == "null"){
            return false;
        }
        return true;
    }
}