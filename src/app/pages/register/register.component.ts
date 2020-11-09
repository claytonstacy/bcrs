/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, Verlee Washington
Date: 20 Oct 2020
Description: App routing file
============================================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';

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

  // any number of numbers between 0-9
  readonly NUMBER = '^[0-9]*$';
  // at least one number, at least one upper case letter, and length 8+
  readonly PASSWORD = '^(?=.+[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$';

  constructor(private http: HttpClient, private router: Router,
              private fb: FormBuilder, private cookieService: CookieService) {

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

        phoneNumber: new FormControl(null, Validators.compose([Validators.required,
          Validators.pattern(this.NUMBER),
          Validators.minLength(10), Validators.maxLength(10)])),

        address: new FormControl(null, Validators.required),

        email: new FormControl(null, Validators.compose([Validators.required,
          Validators.email])),
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

        password: new FormControl(null, Validators.compose([Validators.required,
          Validators.pattern(this.PASSWORD)]))
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
      if (res['data']) {
        // user is authenticated and access is granted
        this.cookieService.set('session_user', credentials.userName, 1);
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
