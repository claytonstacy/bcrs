<<<<<<< HEAD
/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, Verlee Washington
Date: 20 Oct 2020
Description: App routing file
============================================
*/

=======
>>>>>>> 1c2a3038e07d549a9b18540da3999731fa70689f
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestion } from '../../shared/security-question.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  securityQuestions: SecurityQuestion[];
  form: FormGroup;
  registrationForm: FormGroup;
  errorMessage: string;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.http.get('/api/security-questions').subscribe(res => {
      this.securityQuestions = res['data'];
    }, err => {
      console.log(err);
    });
   }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      contactInfo: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        phoneNumber: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
      }),
      securityQuestions: new FormGroup({
        securityQuestion1: new FormControl(null, Validators.required),
        securityQuestion2: new FormControl(null, Validators.required),
        securityQuestion3: new FormControl(null, Validators.required),
        securityAnswer1: new FormControl(null, Validators.required),
        securityAnswer2: new FormControl(null, Validators.required),
        securityAnswer3: new FormControl(null, Validators.required)
      }),
      credentials: new FormGroup({
        userName: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      })
    });
  }

  register(form) {
    const contactInfo = form.contactInfo;
    const securityQuestions = form.securityQuestions;
    const credentials = form.credentials;

    const selectedSecurityQuestions = [
      {
        questionText: securityQuestions.securityQuestion1,
        answerText: securityQuestions.securityAnswer1
      },
      {
        questionText: securityQuestions.securityQuestion2,
        answerText: securityQuestions.securityAnswer2
      },
      {
        questionText: securityQuestions.securityQuestion3,
        answerText: securityQuestions.securityAnswer3
      }
    ];

    console.log(selectedSecurityQuestions);

    this.http.post('/api/session/register', {
      userName: credentials.userName,
      password: credentials.password,
      firstName: contactInfo.firstName,
      lastName: contactInfo.lastName,
      phoneNumber: contactInfo.phoneNumber,
      address: contactInfo.address,
      email: contactInfo.email,
      selectedSecurityQuestions: selectedSecurityQuestions
    }).subscribe(res => {
<<<<<<< HEAD
      console.log(res['data']);
      if (res['data']) {
        // user is authenticated and access is granted
        this.cookieService.set('session_user', credentials.userName, 1);
=======
      if (res['data']) {
        // user is authenticated and access is granted
        this.cookieService.set('sessionuser', credentials.userName, 1);
>>>>>>> 1c2a3038e07d549a9b18540da3999731fa70689f
        this.router.navigate(['/']);
      } else {
        // user is not authenticated, return error message
        this.errorMessage = res['message'];
      }
    }, err => {
      console.log(err);
      this.errorMessage = err;
    });
  }
}
