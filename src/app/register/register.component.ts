import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, Form } from "@angular/forms";
import { LoginService } from '../core/login.service';
import { IToken } from '../shared/TokenInterface';
import { Router } from '@angular/router';
import { RegisterService } from '../core/register.service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit{
    formGroup: FormGroup;
    passwords: FormGroup;
    alertTitle = 'Field is required';
    ErrorMessage = 'Incorrect Username/Password';
    //Error = false;

    constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router){}

    ngOnInit(){
        this.createForm();
    }

    createForm(){
        this.formGroup = this.formBuilder.group({
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', Validators.required],
            ConfirmPassword: ['', [Validators.required, this.matchPasswords.bind(this)]]
        })
    }

    matchPasswords(control: FormControl){

        if (this.formGroup && (control.value !== this.formGroup.controls.Password.value)) {
            return { mismatch: true };
        }
        return null;     
    }

    getPasswordsMismatchError(){
        return this.formGroup.get('ConfirmPassword').hasError('required') ? 'Field is required' : 
            this.formGroup.get('ConfirmPassword').hasError('mismatch') ? 'Passwords do not match' : '';
    }

    getErrorEmail(){
        return this.formGroup.get('Email').hasError('required') ? 'Field is required' :
            this.formGroup.get('Email').hasError('email') ? 'Field must be an email' : '';
    }

    onSubmit(post){
        console.log(post);
        this.registerService.Register(post).subscribe((response) => {
            this.router.navigate(['login']);
        },
        response => {
            //this.Error = true;
        })
    }
}