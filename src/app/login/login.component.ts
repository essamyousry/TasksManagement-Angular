import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { LoginService } from '../core/login.service';
import { IToken } from '../shared/TokenInterface';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { EncryptDecryptService } from '../core/encrypt-decrypt';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit{
    formGroup: FormGroup;
    alertTitle = 'Field is required';
    ErrorMessage = 'Incorrect Username/Password';
    Error = false;

    constructor(private formBuilder: FormBuilder, 
        private loginService: LoginService, 
        private router: Router, 
        private aes: EncryptDecryptService
    ){}

    ngOnInit(){
        this.createForm();
        console.log(localStorage.getItem("Token"));
    }

    createForm(){
        this.formGroup = this.formBuilder.group({
            'Username': ['', Validators.required],
            'Password': ['', Validators.required]
        })
    }

    onSubmit(post){
        console.log(post);
        this.loginService.getToken(post.Username, post.Password).subscribe((Token: IToken) => {
            console.log(Token);
            let EncryptedToken = this.aes.Encrypt(Token.access_token)
            localStorage.setItem("Token", EncryptedToken);
            localStorage.setItem("User", Token.userName);
            this.loginService.Authenticated = true;
            this.router.navigate(['tasks-list']);
        },
        error => {
            this.Error = true;
            console.log(error);
            this.router.navigate(['../', 'login']);
        })
    }
}