import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map, catchError, max } from 'rxjs/operators';
import { ITask } from '../shared/TaskInterface';
import { IRegister } from '../shared/RegisterInterface';

@Injectable()
export class RegisterService {

    baseURL = 'https://localhost:44333/api/Account/';
    constructor(private http: HttpClient){

    }

    Register(Register: IRegister){
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.post(this.baseURL + 'Register', Register, {headers})
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
}