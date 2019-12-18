import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from '../login/login.component';
import { MatFormFieldModule, MatTabsModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [LoginComponent],
    imports: [ 
        CommonModule,
        SharedModule,
        MatFormFieldModule, 
        MatTabsModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [LoginComponent]
})

export class LoginModule{
    
}