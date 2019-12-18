import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TasksService } from './tasks.service';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
    imports: [ HttpClientModule ],
    providers: [ 
        TasksService, 
        LoginService, 
        RegisterService, 
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }]
})

export class CoreModule { }