import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule, MatTabsModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

@NgModule({
    declarations: [RegisterComponent],
    imports: [ 
        CommonModule,
        SharedModule,
        MatFormFieldModule, 
        MatTabsModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    exports: [RegisterComponent]
})

export class RegisterModule{
    
}