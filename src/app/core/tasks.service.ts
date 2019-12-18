import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map, catchError, max } from 'rxjs/operators';
import { ITask } from '../shared/TaskInterface';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable()
export class TasksService {
    baseURL: string = 'https://localhost:44333/api/';
    pageIndex = 0;

    constructor(private http: HttpClient, private router: Router){}

    getTasks() : Observable<ITask[]>{
        //const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("Token"));
        return this.http.get<ITask[]>(this.baseURL + 'GetAllTasks')
            .pipe(
                catchError(this.handleError)
            )
    }

    getTask(id: number) : Observable<ITask>{
        //const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("Token"));
        return this.http.get<ITask>(this.baseURL + 'GetTask/' + id)
            .pipe(
                catchError(this.handleError)
            )
    }

    AddTask(task: any){
        //const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("Token"));
        return this.http.post(this.baseURL + 'AddTask', task)
            .pipe(
                catchError(this.handleError)
            )
    }

    UpdateTask(task: any, id: number){
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("Token"));
        return this.http.put(this.baseURL + 'UpdateTask/' + id, task)
            .pipe(
                catchError(this.handleError)
            )
    }

    DeleteTask(id: number){
        //const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem("Token"));
        return this.http.delete(this.baseURL + 'DeleteTask/' + id)
            .pipe(
                catchError(this.handleError)
            )
    }

    /*
    doLogin(){
        this.login.subscribe();
        localStorage.setItem("token", "");
    }

    returnToken(){
        return localStorage.getItem("token");
    }
    */
   handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(error);
  }
}